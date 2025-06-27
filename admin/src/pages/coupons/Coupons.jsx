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

import Drawer from "../../components/ui/Drawer";
import AddCoupons from "./AddCoupons";
import CouponsDetails from "./CouponsDetails";
import useCoupons from "../../customhook/coupon";

const Coupons = () => {
  const gridRef = useRef();
  const { coupons, updateCoupon, deleteCoupon, fetchCoupons, loading } =
    useCoupons();

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
      await updateCoupon(data.id, data);
      toast.success("Coupon updated");
    },
    [updateCoupon]
  );

  const colDefs = [
    {
      field: "coupon_code",
      headerName: "Coupon Code",
      editable: false,
      flex: 1,
      cellRenderer: (params) => (
        <span
          className="text-blue-500 hover:text-blue-700 cursor-pointer"
          onClick={() => {
            setSelectedRow(params.data);
            setDrawerContent(
              <CouponsDetails
                editData={params.data}
                refresh={() => {
                  fetchCoupons();
                  setDrawerOpen(false);
                }}
                updateCoupon={updateCoupon}
              />
            );
            setDrawerOpen(true);
          }}
        >
          {params.value}
        </span>
      ),
    },
    { field: "discount_type", headerName: "Type", flex: 1, editable: true },
    {
      field: "discount_value",
      headerName: "Value",
      flex: 1,
      editable: true,
    },
    {
      field: "max_discount",
      headerName: "Max Discount",
      flex: 1,
      editable: true,
    },
    {
      field: "minimum_order_value",
      headerName: "Min Order",
      flex: 1,
      editable: true,
    },
    {
      field: "valid_from",
      headerName: "Valid From",
      flex: 1,
      editable: false,
    },
    {
      field: "valid_to",
      headerName: "Valid To",
      flex: 1,
      editable: false,
    },
    {
      field: "is_active",
      headerName: "Active",
      flex: 1,
      editable: true,
      cellRenderer: (params) =>
        params.value ? (
          <span className="text-green-600 font-semibold">Yes</span>
        ) : (
          <span className="text-red-500">No</span>
        ),
    },
    {
      field: "action",
      headerName: "Actions",
      flex: 1,
      cellRenderer: (params) => (
        <div className="flex justify-center gap-8">
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => updateCoupon(params.data.id, params.data)}
          >
            <FontAwesomeIcon icon={faSave} />
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => deleteCoupon(params.data.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Header name="Coupons">
        <DrawerButton
          name="Add Coupon"
          component={<AddCoupons refresh={fetchCoupons} />}
        />
      </Header>

      <div className="w-full flex justify-end mt-3">
        <button
          onClick={() => handleExportCsv(gridRef, "Coupons")}
          className="global-export-btn mr-5 flex items-center justify-center gap-x-2"
        >
          Export Data <Download size={16} />
        </button>
      </div>

      <div className="ag-theme-quartz mx-3 pb-3" style={{ height: "540px" }}>
        <AgGridReact
          ref={gridRef}
          rowData={coupons}
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
          title={selectedRow.coupon_code}
        >
          {drawerContent}
        </Drawer>
      )}
    </div>
  );
};

export default Coupons;
