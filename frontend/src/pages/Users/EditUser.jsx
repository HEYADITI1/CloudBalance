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

  // 🔐 Redux auth
  const user = useSelector(state => state.auth.user);

  const [collapsed, setCollapsed] = useState(false);

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

  /* ---------------- FETCH USER ---------------- */
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
          u.cloudAccounts ? u.cloudAccounts.map(a => a.id) : []
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

  /* ---------------- FETCH CLOUD ACCOUNTS ---------------- */
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

  /* ---------------- CLEAR ACCOUNTS IF ROLE ≠ CUSTOMER ---------------- */
  useEffect(() => {
    if (form.role !== "CUSTOMER") {
      setSelectedAccounts([]);
    }
  }, [form.role]);

  /* ---------------- HANDLERS ---------------- */
  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleAccount = (accountId) => {
    if (user?.role !== "ADMIN") return;

    setSelectedAccounts(prev =>
      prev.includes(accountId)
        ? prev.filter(id => id !== accountId)
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
      <Header
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(s => !s)}
      />

      <main className="flex-1 w-full p-6 pb-28">
        <div className="flex gap-6">
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

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={onChange}
                      disabled={user?.role !== "ADMIN"}
                      className="border p-2 rounded"
                    />
                    <input
                      name="lastName"
                      value={form.lastName}
                      onChange={onChange}
                      disabled={user?.role !== "ADMIN"}
                      className="border p-2 rounded"
                    />
                  </div>

                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    disabled={user?.role !== "ADMIN"}
                    className="border p-2 rounded w-full"
                  />

                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={onChange}
                    placeholder="Leave blank to keep existing password"
                    className="border p-2 rounded w-full"
                  />

                  <select
                    name="role"
                    value={form.role}
                    onChange={onChange}
                    disabled={user?.role !== "ADMIN"}
                    className="border p-2 rounded w-full"
                  >
                    <option value="ADMIN">Admin</option>
                    <option value="READ_ONLY">Read Only</option>
                    <option value="CUSTOMER">Customer</option>
                  </select>

                  {form.role === "CUSTOMER" && (
                    <div className="border p-3 rounded bg-gray-50">
                      {accounts.map(acc => (
                        <label key={acc.id} className="flex gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={selectedAccounts.includes(acc.id)}
                            disabled={user?.role !== "ADMIN"}
                            onChange={() => toggleAccount(acc.id)}
                          />
                          {acc.accountId} ({acc.accountName})
                        </label>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button onClick={handleCancel} className="border px-4 py-2 rounded">
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={user?.role !== "ADMIN"}
                      className={`px-4 py-2 rounded ${
                        user?.role === "ADMIN"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-300 text-gray-600"
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
