import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import Footer from "../../Components/Footer";

import { getUserById, updateUser } from "../../api/userApi";
import { getCloudAccounts } from "../../api/cloudAccountApi";

export default function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();

  const user = useSelector((state) => state.auth.user);

  const [accounts, setAccounts] = useState([]);
  const [selectedAccounts, setSelectedAccounts] = useState([]);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "ADMIN",
    isActive: true,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserById(id);
        const u = res.data;

        setForm({
          firstName: u.firstName,
          lastName: u.lastName,
          email: u.email,
          password: "",
          role: u.role?.name,
          isActive: u.isActive,
        });

        setSelectedAccounts(
          u.cloudAccounts ? u.cloudAccounts.map((a) => a.id) : []
        );
      } catch (err) {
        console.error(err);
        alert("Failed to load user");
        navigate("/users");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, navigate]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await getCloudAccounts();
        setAccounts(res.data || []);
      } catch (err) {
        console.error("Failed to load cloud accounts", err);
      }
    };

    fetchAccounts();
  }, []);

  /* CLEAR ACCOUNTS IF ROLE IS NOT CUSTOMER*/
  useEffect(() => {
    if (form.role !== "CUSTOMER") {
      setSelectedAccounts([]);
    }
  }, [form.role]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleAccount = (accountId) => {
    if (user?.role !== "ADMIN") return;

    setSelectedAccounts((prev) =>
      prev.includes(accountId)
        ? prev.filter((id) => id !== accountId)
        : [...prev, accountId]
    );
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/users");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (user?.role !== "ADMIN") return;

    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      role: form.role,
      isActive: form.isActive,
      cloudAccountIds: form.role === "CUSTOMER" ? selectedAccounts : [],
    };

    if (form.password && form.password.trim() !== "") {
      payload.password = form.password;
    }

    try {
      await updateUser(id, payload);
      navigate("/users");
    } catch (err) {
      console.error(err);
      alert("Failed to update user");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        Loading user...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 w-full p-6 pb-28">
        <div className="flex gap-6">
          <Sidebar selected="users" />

          <div className="flex-1">
            <div className="w-full max-w-3xl">
              <div className="text-sm text-gray-500 mb-4">
                <span
                  className="text-blue-600 cursor-pointer"
                  onClick={() => navigate("/users")}
                >
                  Users
                </span>
                <span className="mx-2">/</span>
                <span>Edit User</span>
              </div>

              <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold mb-4">Edit User</h2>

                <form onSubmit={handleUpdate} className="space-y-4">
                  <h2 className="text-lg font-semibold mb-4">Edit User</h2>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        name="firstName"
                        value={form.firstName}
                        onChange={onChange}
                        className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        name="lastName"
                        value={form.lastName}
                        onChange={onChange}
                        className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Email ID
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={onChange}
                      className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={onChange}
                      placeholder="Leave blank to keep existing password"
                      className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Role
                    </label>
                    <select
                      name="role"
                      value={form.role}
                      onChange={onChange}
                      className="w-full border border-gray-200 rounded px-3 py-2 text-sm bg-white"
                    >
                      <option value="ADMIN">Admin</option>
                      <option value="READ_ONLY">Read Only</option>
                      <option value="CUSTOMER">Customer</option>
                    </select>
                  </div>

                  {form.role === "CUSTOMER" && (
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">
                        Accounts
                      </label>

                      <div className="grid grid-cols-2 gap-4">
                        {/* ALL ACCOUNTS */}
                        <div className="border border-gray-200 rounded p-3 bg-gray-50 max-h-64 overflow-y-auto">
                          <p className="text-sm font-medium text-gray-700 mb-2">
                            All Accounts
                          </p>

                          {accounts.map((acc) => (
                            <label
                              key={acc.id}
                              className="flex items-center gap-2 text-sm text-gray-700"
                            >
                              <input
                                type="checkbox"
                                checked={selectedAccounts.includes(acc.id)}
                                disabled={user?.role !== "ADMIN"}
                                onChange={() => toggleAccount(acc.id)}
                                className="accent-blue-600"
                              />

                              <span className="font-mono text-gray-900">
                                {acc.accountId}
                              </span>

                              <span className="text-gray-500">
                                ({acc.accountName})
                              </span>
                            </label>
                          ))}
                        </div>

                        {/* LINKED ACCOUNTS */}
                        <div className="border border-gray-200 rounded p-3 bg-white max-h-64 overflow-y-auto">
                          <p className="text-sm font-medium text-gray-700 mb-2">
                            Linked Accounts
                          </p>

                          {selectedAccounts.length === 0 ? (
                            <p className="text-sm text-gray-400 italic">
                              No accounts linked
                            </p>
                          ) : (
                            selectedAccounts.map((id) => {
                              const acc = accounts.find((a) => a.id === id);

                              return (
                                <div
                                  key={id}
                                  className="flex items-center gap-2 text-sm text-gray-700"
                                >
                                  <input
                                    type="checkbox"
                                    checked
                                    readOnly
                                    className="accent-blue-600 cursor-default"
                                  />

                                  <span className="font-mono text-gray-900">
                                    {acc?.accountId}
                                  </span>

                                  <span className="text-gray-500">
                                    ({acc?.accountName})
                                  </span>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>

                      {user?.role !== "ADMIN" && (
                        <p className="text-xs text-gray-400 mt-1">
                          Only Admin users can modify account assignments.
                        </p>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-3 mt-4">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-4 py-2 text-sm bg-white border border-gray-200 rounded hover:bg-gray-50"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={user?.role !== "ADMIN"}
                      className={`px-4 py-2 text-sm rounded ${
                        user?.role === "ADMIN"
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-gray-300 text-gray-600 cursor-not-allowed"
                      }`}
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
