import { useRef, useState, useCallback, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-quartz.css";
import DrawerButton from "../../components/ui/DrawerButton";
import Header from "../../components/ui/header";
import AddBrands from "./AddBrands";
import handleExportCsv from "../../utils/CommonFunctions";
import { Download } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

import useBrands from "../../customhook/brands";
import BrandDetails from "./BrandDetails";
import Drawer from "../../components/ui/Drawer";

const Brands = () => {
  const gridRef = useRef();
  const { brands, updateBrand, deleteBrand, fetchBrands, loading, error } =
    useBrands();
useEffect(() => {
  if (gridRef.current && gridRef.current.api) {
    if (loading) {
      gridRef.current.api.showLoadingOverlay();
    } else {
      gridRef.current.api.hideOverlay();
    }
  }
}, [loading]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);

  console.log("brands", brands);
  console.log("row", selectedRow);

  const handleCellEdit = useCallback(
    async (params) => {
      const { data } = params;
      await updateBrand(data.id, data);
      toast.success('Updated Successfully')
    },
    [updateBrand]
  );

  const colDefs = [
    {
      field: "brand_name",
      headerName: "Brand",
      filter: true,
      editable: false, // disable inline editing if clicking for drawer
      flex: 1,
      cellRenderer: (params) => (
        <span
          className="text-blue-500 hover:text-blue-700  cursor-pointer"
          onClick={() => {
            setSelectedRow(params.data);
            setDrawerContent(
              <BrandDetails
                editData={params.data}
                refresh={() => {
                  fetchBrands();
                  setDrawerOpen(false);
                }}
                updateBrand={updateBrand}
              />
            );
            setDrawerOpen(true);
          }}
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "description",
      headerName: "Description",
      editable: true,
      flex: 1,
    },
    { field: "image", headerName: "Image", editable: true, flex: 1 },
    {
      field: "action",
      headerName: "Actions",
      flex: 1,
      cellRenderer: (params) => (
        <div className="flex justify-center gap-8">
          <button
            className="text-blue-500 hover:text-blue-700 hover:cursor-pointer"
            onClick={() => updateBrand(params.data.id, params.data)}
          >
            <FontAwesomeIcon icon={faSave} className="w-4 h-4" />
          </button>
          <button
            className="text-red-500 hover:text-red-700 hover:cursor-pointer"
            onClick={() => deleteBrand(params.data.id)}
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
      <Header name="Brands">
        <DrawerButton
          name="Add Brands"
          component={<AddBrands refresh={fetchBrands} />}
        />
      </Header>

      {/* Export Button */}
      <div className="w-full flex justify-end mt-3">
        <button
          onClick={() => handleExportCsv(gridRef, "Brands")}
          className="global-export-btn mr-5  flex items-center justify-center gap-x-2"
        >
          Export Data
          <Download size={16} />
        </button>
      </div>
{loading && <p className="text-center text-gray-500">Loading...</p>}
      {/* AG Grid */}
      <div className="ag-theme-quartz mx-3 pb-3" style={{ height: "540px" }}>
        <AgGridReact
          ref={gridRef}
          rowData={brands}
          columnDefs={colDefs}
          pagination={true}
          onCellValueChanged={handleCellEdit}
          animateRows={true}
        />
      </div>

      {/* Drawer for Update */}
      {selectedRow && (
        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title={selectedRow.brand_name}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Loading/Error Messages */}
      
     
    </div>
  );
};

export default Brands;
