/** @format */

"use client";
import React from "react";
import { useGetSupportMessagesQuery } from "@/redux/freatures/supportAPI";
import { FiMail, FiUser, FiCalendar } from "react-icons/fi";

const Support = () => {
  const { data, isLoading, error } = useGetSupportMessagesQuery();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div>
        <h2 className="text-2xl font-medium text-heading mb-5">
          Support Messages
        </h2>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading messages...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2 className="text-2xl font-medium text-heading mb-5">
          Support Messages
        </h2>
        <div className="flex items-center justify-center h-96">
          <p className="text-red-600">
            Failed to load support messages. Please try again.
          </p>
        </div>
      </div>
    );
  }

  const messages = data?.messages || [];

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-medium text-heading">Support Messages</h2>
        <div className="bg-bg-primary text-white px-4 py-2 rounded-lg">
          <span className="font-medium">{messages.length}</span> Messages
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-96 bg-white rounded-2xl">
          <div className="text-center">
            <FiMail className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg">No support messages found</p>
          </div>
        </div>
      ) : (
        <div className=" gap-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-bg-primary/10 rounded-full flex items-center justify-center">
                    <FiUser className="text-bg-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-heading text-base">
                      {message.full_name}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <FiMail className="w-3 h-3" />
                      <span className="text-xs">{message.email}</span>
                    </div>
                  </div>
                </div>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                  #{message.id}
                </span>
              </div>

              {/* Message */}
              <div className="mb-4">
                <p className="text-paragraph text-sm leading-relaxed line-clamp-4">
                  {message.message}
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-1 text-gray-500">
                  <FiCalendar className="w-4 h-4" />
                  <span className="text-xs font-medium">
                    {formatDate(message.created_at)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Support;
