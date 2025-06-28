import { useRef, useState, useEffect, useCallback } from "react";
import axios from "../../utils/axiosInstance.js"
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Header from "../../components/ui/Header";
import DrawerButton from "../../components/ui/DrawerButton";
import Drawer from "../../components/ui/Drawer";
import { Download } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import handleExportCsv from "../../utils/CommonFunctions";
import { toast } from "react-toastify";



import AddCustomers from "./AddCustomers";
import CustomersDetails from "./CustomersDetails";

const Customers = () => {
  const gridRef = useRef();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);

  // Fetch customers from API
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/customers");
      setCustomers(res.data);
    } catch (err) {
      toast.error("Failed to fetch customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    if (gridRef.current && gridRef.current.api) {
      loading
        ? gridRef.current.api.showLoadingOverlay()
        : gridRef.current.api.hideOverlay();
    }
  }, [loading]);

  // Update customer
  const updateCustomer = async (id, data) => {
    try {
      await axios.put(`/api/customers/${id}`, data);
      toast.success("Customer updated successfully");
    } catch (err) {
      toast.error("Failed to update customer");
    }
  };

  // Delete customer
  const deleteCustomer = async (id) => {
    try {
      await axios.delete(`/api/customers/${id}`);
      toast.success("Customer deleted");
      fetchCustomers();
    } catch (err) {
      toast.error("Failed to delete customer");
    }
  };

  const handleCellEdit = useCallback(
    async (params) => {
      const { data } = params;
      await updateCustomer(data.id, data);
    },
    []
  );

  const colDefs = [
    {
      field: "name",
      headerName: "Name",
      filter: true,
      editable: false,
      flex: 1,
      cellRenderer: (params) => (
        <span
          className="text-blue-600 hover:underline cursor-pointer"
          onClick={() => {
            setSelectedRow(params.data);
            setDrawerContent(
              <CustomersDetails
                editData={params.data}
                refresh={() => {
                  fetchCustomers();
                  setDrawerOpen(false);
                }}
                updateCustomer={updateCustomer}
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
      field: "email",
      headerName: "Email",
      editable: true,
      flex: 1,
    },
    {
      field: "mobile",
      headerName: "Phone",
      editable: true,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      editable: false,
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
            onClick={() => updateCustomer(params.data.id, params.data)}
          >
            <FontAwesomeIcon icon={faSave} />
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => deleteCustomer(params.data.id)}
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
      <Header name="Customers">
        <DrawerButton
          name="Add Customer"
          component={<AddCustomers refresh={fetchCustomers} />}
        />
      </Header>

      {/* Export Button */}
      <div className="w-full flex justify-end mt-3">
        <button
          onClick={() => handleExportCsv(gridRef, "Customers")}
          className="global-export-btn mr-5 flex items-center gap-2"
        >
          Export Data
          <Download size={16} />
        </button>
      </div>

      {/* AG Grid */}
      <div className="ag-theme-quartz mx-3 pb-3" style={{ height: "540px" }}>
        <AgGridReact
          ref={gridRef}
          rowData={customers}
          columnDefs={colDefs}
          pagination={true}
          paginationPageSize={10}
          animateRows={true}
          onCellValueChanged={handleCellEdit}
        />
      </div>

      {/* Drawer */}
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

export default Customers;
