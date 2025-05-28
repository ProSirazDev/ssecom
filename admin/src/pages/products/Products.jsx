import { useRef, useState, useCallback, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-quartz.css";
import DrawerButton from "../../components/ui/DrawerButton";
import Header from "../../components/ui/header";
import AddProduct from "./AddProduct";
import handleExportCsv from "../../utils/CommonFunctions";
import { Download } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";


import Drawer from "../../components/ui/Drawer";
import useProduct from "../../customhook/products";
import ProductsDetail from "./ProductsDetail";

const Products = () => {
  const gridRef = useRef();
  const { products, updateProduct, deleteProduct, loading, error, fetchProducts } =
    useProduct();
    console.log(products,"products");
    console.log("Grid rowData:", Array.isArray(products.products), products.products);

    

  const [selectedRow, setSelectedRow] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);

  useEffect(() => {
    if (gridRef.current && gridRef.current.api) {
      if (loading) {
        gridRef.current.api.showLoadingOverlay();
      } else {
        gridRef.current.api.hideOverlay();
      }
    }
  }, [loading]);

  const handleCellEdit = useCallback(
    async (params) => {
      const { data } = params;
      await updateProduct(data.id, data);
      toast.success("Updated Successfully");
    },
    [updateProduct]
  );

  const colDefs = [
    {
      field: "product_name",
      headerName: "Product",
      filter: true,
      editable: false,
      flex: 1,
      cellRenderer: (params) => (
        <span
          className="text-blue-500 hover:text-blue-700 cursor-pointer"
          onClick={() => {
            setSelectedRow(params.data);
            setDrawerContent(
              <ProductsDetail
                editData={params.data}
                refresh={() => {
                  fetchProducts();
                  setDrawerOpen(false);
                }}
                updateProduct={updateProduct}
              />
            );
            setDrawerOpen(true);
          }}
        >
          {params.value}
        </span>
      ),
    },
    { field: "sku", headerName: "SKU", editable: true, flex: 1 },
    { field: "price", headerName: "Price", editable: true, flex: 1 },
    { field: "status", headerName: "Status", editable: true, flex: 1 },
    { field: "image", headerName: "Image", editable: true, flex: 1 },
    {
      field: "action",
      headerName: "Actions",
      flex: 1,
      cellRenderer: (params) => (
        <div className="flex justify-center gap-8">
          <button
            className="text-blue-500 hover:text-blue-700 cursor-pointer"
            onClick={() => updateProduct(params.data.id, params.data)}
          >
            <FontAwesomeIcon icon={faSave} className="w-4 h-4" />
          </button>
          <button
            className="text-red-500 hover:text-red-700 cursor-pointer"
            onClick={() => deleteProduct(params.data.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* Header */}
      <Header name="Products">
        <DrawerButton
          name="Add Product"
          component={<AddProduct refresh={fetchProducts} />}
        />
      </Header>

      {/* Export Button */}
      <div className="w-full flex justify-end mt-3">
        <button
          onClick={() => handleExportCsv(gridRef, "Products")}
          className="global-export-btn mr-5 flex items-center justify-center gap-x-2"
        >
          Export Data
          <Download size={16} />
        </button>
      </div>

      {loading && <p className="text-center text-gray-500">Loading...</p>}

      {/* AG Grid */}
      <div className="ag-theme-quartz mx-3 pb-3" style={{ height: "77vh" }}>
        <AgGridReact
          ref={gridRef}
         rowData={Array.isArray(products.products) ? products.products : []}
          columnDefs={colDefs}
          pagination={true}
          paginationPageSize={10}
          onCellValueChanged={handleCellEdit}
          animateRows={true}
        />
      </div>

      {/* Drawer for Update */}
      {selectedRow && (
        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title={selectedRow.product_name}
        >
          {drawerContent}
        </Drawer>
      )}
    </div>
  );
};

export default Products;
