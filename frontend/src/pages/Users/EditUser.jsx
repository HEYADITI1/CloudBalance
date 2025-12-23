import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import Footer from "../../Components/Footer";

import { getUserById, updateUser } from "../../api/userApi";

export default function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [collapsed, setCollapsed] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "ADMIN",      // backend expects ADMIN, READ_ONLY, CUSTOMER
    isActive: true,
  });

  const [loading, setLoading] = useState(true);

  // Load user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserById(id);
        const user = res.data;

        setForm({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role?.name,     // backend sends { role: { name: "ADMIN" } }
          isActive: user.isActive,
        });

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

  // Handle input changes
  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Cancel button
  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/users");
  };

  // Save changes (PUT API)
  const handleUpdate = async (e) => {
    e.preventDefault();

    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      role: form.role,          // must be ADMIN / READ_ONLY / CUSTOMER
      isActive: form.isActive,
    };

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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((s) => !s)}
      />

      <main className="flex-1 w-full px-6 py-6 pb-28">
        <div className="flex items-start gap-6">

          <Sidebar selected="users" collapsed={collapsed} />

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

                  {/* FIRST / LAST NAME */}
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

                  {/* EMAIL */}
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

                  {/* ROLE + ACTIVE */}
                  <div className="grid grid-cols-2 gap-4 items-center">

                    {/* ROLE DROPDOWN */}
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">
                        Role
                      </label>
                      <select
                        name="role"           // ✔ CORRECT
                        value={form.role}     // ✔ CORRECT
                        onChange={onChange}
                        className="w-full border border-gray-200 rounded px-3 py-2 text-sm bg-white"
                      >
                        <option value="ADMIN">Admin</option>
                        <option value="READ_ONLY">Read Only</option>
                        <option value="CUSTOMER">Customer</option>
                      </select>
                    </div>

                    {/* ACTIVE TOGGLE */}
                    <div className="flex items-center gap-3">
                      <label className="text-sm text-gray-700">Active</label>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="isActive"         // ✔ CORRECT
                          checked={form.isActive} // ✔ CORRECT
                          onChange={onChange}
                          className="sr-only"
                        />
                        <div
                          className={`w-11 h-6 flex items-center rounded-full p-1 transition ${
                            form.isActive ? "bg-blue-600" : "bg-gray-200"
                          }`}
                        >
                          <div
                            className={`bg-white w-4 h-4 rounded-full transform transition ${
                              form.isActive ? "translate-x-5" : ""
                            }`}
                          />
                        </div>
                      </label>
                    </div>

                  </div>

                  {/* BUTTONS */}
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
