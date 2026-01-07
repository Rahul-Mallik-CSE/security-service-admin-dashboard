/** @format */

"use client";
import { CiCircleInfo, CiSearch } from "react-icons/ci";
import { useState } from "react";
import { ISubscription, TableColumn } from "../../types/AllTypes";
import CustomTable from "../../components/SharedComponents/CustomTable";
import { Button } from "@/components/ui/button";
import { AiOutlineDelete } from "react-icons/ai";
import EarningInfoModal from "./EarningInfoModal";
import {
  useGetSubscriptionsQuery,
  useDeleteSubscriptionMutation,
} from "@/redux/freatures/subscriptionsAPI";
import DeleteModal from "@/components/SharedComponents/DeleteModal";
import { toast } from "react-toastify";

const Subscriptions = () => {
  const [searchText, setSeachText] = useState<string>("");
  const [selectedSubscription, setSelectedSubscription] =
    useState<ISubscription | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [subscriptionToDelete, setSubscriptionToDelete] = useState<
    number | null
  >(null);

  const { data: subscriptionsData, isLoading } = useGetSubscriptionsQuery();
  const [deleteSubscription, { isLoading: isDeleting }] =
    useDeleteSubscriptionMutation();

  const columns: TableColumn[] = [
    { key: "id", label: "#TR.ID", width: "100px" },
    { key: "userName", label: "User Name", width: "150px" },
    { key: "email", label: "Email", width: "200px" },
    { key: "invoice_date", label: "Date", width: "120px" },
    { key: "price", label: "Amount", width: "100px" },
    { key: "action", label: "Action", width: "100px" },
  ];

  const handleDelete = async () => {
    if (subscriptionToDelete === null) return;

    try {
      await deleteSubscription(subscriptionToDelete).unwrap();
      toast.success("Subscription deleted successfully!");
      setDeleteModalOpen(false);
      setSubscriptionToDelete(null);
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          "Failed to delete subscription. Please try again."
      );
    }
  };

  const handleOpenDeleteModal = (id: number) => {
    setSubscriptionToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleOpenInfoModal = (subscription: ISubscription) => {
    setSelectedSubscription(subscription);
    setIsModalOpen(true);
  };

  const renderCell = (item: ISubscription, columnKey: string) => {
    switch (columnKey) {
      case "userName":
        return item.user.first_name;
      case "email":
        return item.user.email;
      case "invoice_date":
        return new Date(item.invoice_date).toLocaleDateString();
      case "price":
        return `$${item.price}`;
      case "action":
        return (
          <div className="flex items-center">
            <button
              onClick={() => handleOpenInfoModal(item)}
              className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
            >
              <CiCircleInfo className="size-6 text-gray-600" />
            </button>
            <Button
              onClick={() => handleOpenDeleteModal(item.id)}
              className="p-0.5 bg-transparent hover:bg-gray-100 rounded-md transition-colors"
            >
              <AiOutlineDelete className="size-6 text-gray-600" />
            </Button>
          </div>
        );
      default:
        return String((item as any)[columnKey]);
    }
  };
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-gray-600">Loading subscriptions...</p>
      </div>
    );
  }

  const subscriptions = subscriptionsData?.results || [];

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-medium text-heading">Earnings List</h2>
        <form className="relative">
          <input
            type="search"
            placeholder="Search"
            name="search"
            onChange={(e) => setSeachText(e.currentTarget.value)}
            className="bg-gray-50 py-2 pl-10 pr-4 appearance-none outline-none border border-gray-300 rounded-xl w-[282px]"
          />
          <CiSearch
            className="absolute left-3 top-3 text-paragraph"
            size={20}
          />
        </form>
      </div>
      <CustomTable
        columns={columns}
        data={subscriptions}
        renderCell={renderCell}
        itemsPerPage={15}
      />
      <EarningInfoModal
        subscription={selectedSubscription}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <DeleteModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={handleDelete}
        title="Delete Subscription"
        description="Are you sure you want to delete this subscription? This action cannot be undone."
        itemName={selectedSubscription?.user.first_name}
      />
    </div>
  );
};

export default Subscriptions;
