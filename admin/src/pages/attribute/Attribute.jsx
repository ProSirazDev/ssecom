import { useRef, useState, useCallback, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-quartz.css";
import DrawerButton from "../../components/ui/DrawerButton";
import Header from "../../components/ui/Header";

import handleExportCsv from "../../utils/CommonFunctions";
import { Download } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

import useAttributes from "../../customhook/attributes";

import Drawer from "../../components/ui/Drawer";
import AddAttribute from "./AddAttribute";
import AttributeDetails from "./AttributeDetails";

const Attributes = () => {
  const gridRef = useRef();
  const {
    attributes,
    updateAttribute,
    deleteAttribute,
    fetchAttributes,
    loading,
    error,
  } = useAttributes();

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
      await updateAttribute(data.id, data);
      toast.success("Updated Successfully");
    },
    [updateAttribute]
  );

  const colDefs = [
    {
      field: "attribute_name",
      headerName: "Attribute Name",
      filter: true,
      editable: false,
      flex: 1,
      cellRenderer: (params) => (
        <span
          className="text-blue-500 hover:text-blue-700 cursor-pointer"
          onClick={() => {
            setSelectedRow(params.data);
            setDrawerContent(
              <AttributeDetails
                editData={params.data}
                refresh={() => {
                  fetchAttributes();
                  setDrawerOpen(false);
                }}
                updateAttribute={updateAttribute}
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
    {
      field: "action",
      headerName: "Actions",
      flex: 1,
      cellRenderer: (params) => (
        <div className="flex justify-center gap-8">
          <button
            className="text-blue-500 hover:text-blue-700 hover:cursor-pointer"
            onClick={() => updateAttribute(params.data.id, params.data)}
          >
            <FontAwesomeIcon icon={faSave} className="w-4 h-4" />
          </button>
          <button
            className="text-red-500 hover:text-red-700 hover:cursor-pointer"
            onClick={() => deleteAttribute(params.data.id)}
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
      <Header name="Attributes">
        <DrawerButton
          name="Add Attribute"
          component={<AddAttribute refresh={fetchAttributes} />}
        />
      </Header>

      {/* Export Button */}
      <div className="w-full flex justify-end mt-3">
        <button
          onClick={() => handleExportCsv(gridRef, "Attributes")}
          className="global-export-btn mr-5 flex items-center justify-center gap-x-2"
        >
          Export Data
          <Download size={16} />
        </button>
      </div>

      {/* AG Grid */}
      <div className="ag-theme-quartz mx-3 pb-3" style={{ height: "540px" }}>
        <AgGridReact
          ref={gridRef}
          rowData={attributes}
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
          title={selectedRow.name}
        >
          {drawerContent}
        </Drawer>
      )}
    </div>
  );
};

export default Attributes;
