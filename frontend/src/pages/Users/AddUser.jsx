import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import Footer from "../../Components/Footer";
import { createUser } from "../../api/userApi";


export default function AddUser() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "Admin",
    isActive: false,
  });

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/users");
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      role: form.role,
      isActive: true
    };

    try {
      await createUser(payload);
      navigate("/users");
    } catch (err) {
      console.error(err);
      alert("Failed to create user");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header collapsed={collapsed} onToggleCollapse={() => setCollapsed((s) => !s)} />
      <main className="flex-1 w-full px-6 py-6 pb-28">
        <div className="flex items-start gap-6">
          <Sidebar selected="users" onSelect={() => {}} collapsed={collapsed} />

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
                <span>Add New User</span>
              </div>

              <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold mb-4">Add New User</h2>

                <form onSubmit={handleCreate} className="space-y-4">
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
                        placeholder="Enter first name"
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
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Email ID</label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                      placeholder="Enter email"
                      type="email"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 items-center">
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Role</label>
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

                    <div className="flex items-center gap-3">
                      <label className="text-sm text-gray-700">
                        Two-factor authentication
                      </label>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="twoFactor"
                          checked={form.twoFactor}
                          onChange={onChange}
                          className="sr-only"
                        />
                        <div
                          className={`w-11 h-6 flex items-center rounded-full p-1 transition ${
                            form.twoFactor ? "bg-blue-600" : "bg-gray-200"
                          }`}
                        >
                          <div
                            className={`bg-white w-4 h-4 rounded-full transform transition ${
                              form.twoFactor ? "translate-x-5" : ""
                            }`}
                          />
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-4">
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 text-sm bg-white border border-gray-200 rounded hover:bg-gray-50"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Create User
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
