import { useRef, useState, useCallback, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-quartz.css";
import DrawerButton from "../../components/ui/DrawerButton";
import Header from "../../components/ui/header";
import handleExportCsv from "../../utils/CommonFunctions";
import { Download } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

import useHeightclass from "../../customhook/heightclass";
import AddHeightclass from "./AddHeightclass";

import Drawer from "../../components/ui/Drawer";
import HeightclassDetail from "./HeightclassDetail";

const Heightclass = () => {
  const gridRef = useRef();
  const { heights, updateHeightclass, deleteHeightclass, fetchHeightclasses, loading } =
    useHeightclass();

  const [selectedRow, setSelectedRow] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);

  useEffect(() => {
    if (gridRef.current?.api) {
      loading ? gridRef.current.api.showLoadingOverlay() : gridRef.current.api.hideOverlay();
    }
  }, [loading]);

  const handleCellEdit = useCallback(
    async (params) => {
      const { data } = params;
      await updateHeightclass(data.id, data);
      toast.success("Updated Successfully");
    },
    [updateHeightclass]
  );

  const colDefs = [
    {
      field: "title",
      headerName: "Title",
      filter: true,
      editable: false,
      flex: 1,
      cellRenderer: (params) => (
        <span
          className="text-blue-500 hover:text-blue-700 cursor-pointer"
          onClick={() => {
            setSelectedRow(params.data);
            setDrawerContent(
              <HeightclassDetail
                editData={params.data}
                refresh={() => {
                  fetchHeightclasses();
                  setDrawerOpen(false);
                }}
                updateHeightclass={updateHeightclass}
              />
            );
            setDrawerOpen(true);
          }}
        >
          {params.value}
        </span>
      ),
    },
   
    { field: "unit", headerName: "Unit", editable: true, flex: 1 },
     { field: "value", headerName: "Value", editable: true, flex: 1 },
    {
      field: "action",
      headerName: "Actions",
      flex: 1,
      cellRenderer: (params) => (
        <div className="flex justify-center gap-8">
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => updateHeightclass(params.data.id, params.data)}
          >
            <FontAwesomeIcon icon={faSave} className="w-4 h-4" />
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => deleteHeightclass(params.data.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Header name="Height Class">
        <DrawerButton
          name="Add Height Class"
          component={<AddHeightclass refresh={fetchHeightclasses} />}
        />
      </Header>

      <div className="w-full flex justify-end mt-3">
        <button
          onClick={() => handleExportCsv(gridRef, "HeightClass")}
          className="global-export-btn mr-5 flex items-center justify-center gap-x-2"
        >
          Export Data
          <Download size={16} />
        </button>
      </div>

      {loading && <p className="text-center text-gray-500">Loading...</p>}

      <div className="ag-theme-quartz mx-3 pb-3" style={{ height: "540px" }}>
        <AgGridReact
          ref={gridRef}
          rowData={heights}
          columnDefs={colDefs}
          pagination={true}
          onCellValueChanged={handleCellEdit}
          animateRows={true}
        />
      </div>

      {selectedRow && (
        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title={selectedRow.title}
        >
          {drawerContent}
        </Drawer>
      )}
    </div>
  );
};

export default Heightclass;
