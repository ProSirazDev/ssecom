import { useRef, useState, useCallback, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-quartz.css";
import DrawerButton from "../../components/ui/DrawerButton";
import Header from "../../components/ui/Header";
import handleExportCsv from "../../utils/CommonFunctions";
import { Download } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";


import Drawer from "../../components/ui/Drawer";
import useOrders from "../../customhook/orders";
import OrderDetails from "./OrderDetails";


const Orders = () => {
  const gridRef = useRef();
  const {
    orders,
    loading,
    error,
   
    updateOrder,
  } = useOrders();

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
  console.log("selectedRow", selectedRow);
  

  const handleCellEdit = useCallback(
    async (params) => {
      const { data } = params;
      const res = await updateOrder(data.id, data);
      if (res.success) toast.success("Order updated successfully");
      else toast.error(res.error || "Failed to update order");
    },
    [updateOrder]
  );

  const colDefs = [
   {
      field: "order_id",
      headerName: "Order ID",
      editable: false,
       filter: true,
      flex: 2,
    cellRenderer: (params) => (
  <span
    className="text-blue-500 hover:text-blue-700 cursor-pointer"
    onClick={() => {
      setSelectedRow(params.data);
      setDrawerContent(
        <OrderDetails
          orderdata={params.data}
           // ✅ DIRECTLY from params, not from selectedRow
          refresh={() => setDrawerOpen(false)}
        />
      );
      setDrawerOpen(true);
    }}
  >
    {params.value}
  </span>
),

    },
    { field: "customer_name", headerName: "Customer", editable: true, flex: 1 },
{
  field: "order_status",
  headerName: "Status",
  editable: true,
  flex: 1,
  cellRenderer: (params) => {
    const status = params.value?.toLowerCase();

    const colorMap = {
      pending: "text-yellow-500",
      shipped: "text-blue-600",
      delivered: "text-green-500",
      cancelled: "text-red-600",
      returned: "text-purple-600",
      processing: "text-orange-600",
    };

    const colorClass = colorMap[status] || "text-gray-600";

   return (
  <span className={`${colorClass} font-semibold`}>
    {params.value}
  </span>
);

  },
}
,
    { field: "total_amount", headerName: "Total", editable: false, flex: 1 },
     { field: "payment_method", headerName: "Payment Method", editable: false, flex: 1 },
      { field: "payment_status", headerName: "Payment Status", editable: false, flex: 1 },
       { field: "cdate", headerName: "Order Date", editable: false, flex: 1 },
        { field: "udate", headerName: "Updated Date", editable: false, flex: 1 },
    {
      field: "action",
      headerName: "Actions",
      flex: 1,
      cellRenderer: (params) => (
        <button
          className="text-blue-500 hover:text-blue-700 hover:cursor-pointer"
          onClick={() => {
            updateOrder(params.data.id, params.data);
          }}
        >
          <FontAwesomeIcon icon={faSave} />
        </button>
      ),
    },
  ];

  return (
    <div>
      <Header name="Orders" />

      {/* Export Button */}
      <div className="w-full flex justify-end mt-3">
        <button
          onClick={() => handleExportCsv(gridRef, "Orders")}
          className="global-export-btn mr-5 flex items-center justify-center gap-x-2"
        >
          Export Data <Download size={16} />
        </button>
      </div>

      {/* AG Grid */}
      <div className="ag-theme-quartz mx-3 pb-3" style={{ height: "77vh" }}>
        <AgGridReact
          ref={gridRef}
          rowData={orders.orders}
          columnDefs={colDefs}
          pagination={true}
          paginationPageSize={10}
          onCellValueChanged={handleCellEdit}
          animateRows={true}
        />
      </div>

      {/* Drawer (optional) */}
      {selectedRow && (
        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title={`${selectedRow.id}`}
        >
          {drawerContent}
        </Drawer>
      )}

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
    </div>
  );
};

export default Orders;
