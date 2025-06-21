import { useRef, useState, useCallback, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-quartz.css";

import Header from "../../components/ui/Header";
import DrawerButton from "../../components/ui/DrawerButton";
import Drawer from "../../components/ui/Drawer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Download } from "lucide-react";
import { toast } from "react-toastify";

import useCategories from "../../customhook/categories";

import handleExportCsv from "../../utils/CommonFunctions";
import AddCategories from "./AddCategories";
import CategoriesDetail from "./CategoriesDetail";

const Categories = () => {
  const gridRef = useRef();
  const {
    categories,
    updateCategory,
    deleteCategory,
    fetchCategories,
    loading,
  } = useCategories();

  const [selectedRow, setSelectedRow] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);

  useEffect(() => {
    if (gridRef.current?.api) {
      loading
        ? gridRef.current.api.showLoadingOverlay()
        : gridRef.current.api.hideOverlay();
    }
  }, [loading]);

  const handleCellEdit = useCallback(
    async (params) => {
      const { data } = params;
      await updateCategory(data.id, data);
      toast.success("Updated Successfully");
    },
    [updateCategory]
  );

  const colDefs = [
    {
      field: "category_name",
      headerName: "Category",
      filter: true,
      editable: false,
      flex: 1,
      cellRenderer: (params) => (
        <span
          className="text-blue-500 hover:text-blue-700 cursor-pointer"
          onClick={() => {
            setSelectedRow(params.data);
            setDrawerContent(
              <CategoriesDetail
                editData={params.data}
                refresh={() => {
                  fetchCategories();
                  setDrawerOpen(false);
                }}
                updateCategory={updateCategory}
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
      field: "parent_id",
      headerName: "Parent",
      editable: true,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      editable: true,
      flex: 1,
    },
    {
      field: "sortorder",
      headerName: "Sort Order",
      editable: true,
      flex: 1,
    },
    {
      field: "action",
      headerName: "Actions",
      flex: 1,
      cellRenderer: (params) => (
        <div className="flex justify-center gap-8">
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => updateCategory(params.data.id, params.data)}
          >
            <FontAwesomeIcon icon={faSave} className="w-4 h-4" />
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => deleteCategory(params.data.id)}
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
      <Header name="Categories">
        <DrawerButton
          name="Add Category"
          component={<AddCategories refresh={fetchCategories} />}
        />
      </Header>

      {/* Export */}
      <div className="w-full flex justify-end mt-3">
        <button
          onClick={() => handleExportCsv(gridRef, "Categories")}
          className="global-export-btn mr-5 flex items-center gap-x-2"
        >
          Export Data
          <Download size={16} />
        </button>
      </div>

      {/* AG Grid */}
      <div className="ag-theme-quartz mx-3 pb-3" style={{ height: "540px" }}>
        <AgGridReact
          ref={gridRef}
          rowData={categories}
          columnDefs={colDefs}
          pagination={true}
          onCellValueChanged={handleCellEdit}
          animateRows={true}
        />
      </div>

      {/* Drawer for Details */}
      {selectedRow && (
        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title={selectedRow.category_name}
        >
          {drawerContent}
        </Drawer>
      )}
    </div>
  );
};

export default Categories;
