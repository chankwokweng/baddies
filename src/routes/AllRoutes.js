import { Routes, Route } from "react-router-dom";
import { HomePage, Login, Register, PageNotFound, ProfilePage, OrganizerPage, EventPage } from "../pages";
import { ProtectedRoute } from "./ProtectedRoutes";

export const AllRoutes = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="events" element={<ProtectedRoute><EventPage /></ProtectedRoute>} />
        {/* <Route path="events/:id" element={<EventDetail />} /> */}

        <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="organizer" element={<ProtectedRoute><OrganizerPage /></ProtectedRoute>} />

        {/* <Route path="cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
        <Route path="order-summary" element={<ProtectedRoute><OrderPage /></ProtectedRoute>} />
        <Route path="dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} /> */}

        <Route path="*" element={<PageNotFound />} />
    </Routes>
    </>
  )
}