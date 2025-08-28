import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import SettingsSidebar from "../components/SettingsSidebar";
import { fetchCustomer } from "../actions/customers";
import { fetchOwner } from "../actions/owners";
import { FaInstagram, FaFacebook, FaMapMarkerAlt, FaWhatsapp, FaGlobe, FaShareAlt, FaCamera, FaUpload, FaStar, FaChevronRight, } from "react-icons/fa";
import BottomNav from "../components/BottomNav";
import { useNavigate } from "react-router-dom";
const ProfileSettings = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [coverPhoto, setCoverPhoto] = useState("/default-cover.jpg");
    const [galleryPhotos, setGalleryPhotos] = useState([]);
    const [moreOpen, setMoreOpen] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const loadUserData = async () => {
            try {
                const userDataStr = localStorage.getItem("user");
                const savedCover = localStorage.getItem("coverPhoto");
                const savedImage = localStorage.getItem("profilePhoto");
                const savedGallery = localStorage.getItem("galleryPhotos");
                if (!userDataStr) {
                    setError("No user data found in localStorage");
                    setLoading(false);
                    return;
                }
                const userData = JSON.parse(userDataStr);
                let data;
                if (userData.role === "owner") {
                    data = await fetchOwner(userData.id);
                }
                else {
                    data = await fetchCustomer(userData.id);
                }
                const mergedData = {
                    ...data,
                    coverPhoto: savedCover || data?.coverPhoto || "/default-cover.jpg",
                    image: savedImage || data?.image || "/default-profile.jpg",
                };
                setUserData(mergedData);
                setCoverPhoto(mergedData.coverPhoto);
                if (savedGallery) {
                    setGalleryPhotos(JSON.parse(savedGallery));
                }
                setError(null);
            }
            catch (err) {
                console.error(err);
                setError("Error al cargar los datos del usuario");
            }
            finally {
                setLoading(false);
            }
        };
        loadUserData();
    }, []);
    const handleCoverPhotoUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    const newCover = event.target.result;
                    setCoverPhoto(newCover);
                    localStorage.setItem("coverPhoto", newCover);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    const handleProfilePhotoUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    const newProfile = event.target.result;
                    setUserData((prev) => ({ ...prev, image: newProfile }));
                    localStorage.setItem("profilePhoto", newProfile);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    const handleGalleryUpload = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const files = Array.from(e.target.files).slice(0, 5 - galleryPhotos.length);
            const promises = files.map(file => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = (event) => resolve(event.target?.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            });
            Promise.all(promises)
                .then(newPhotos => {
                const updated = [...galleryPhotos, ...newPhotos].slice(0, 5);
                setGalleryPhotos(updated);
                localStorage.setItem("galleryPhotos", JSON.stringify(updated));
            })
                .catch(err => console.error(err));
        }
    };
    const handleShare = async () => {
        try {
            const url = window.location.href;
            if (navigator.share) {
                await navigator.share({
                    title: userData?.name || "Perfil",
                    text: "Mira este perfil",
                    url,
                });
            }
            else {
                await navigator.clipboard.writeText(url);
                alert("Enlace copiado al portapapeles");
            }
            setMoreOpen(false);
        }
        catch (e) {
            console.error(e);
        }
    };
    if (loading)
        return _jsx("div", { className: "text-center p-6", children: "Cargando..." });
    if (error)
        return _jsx("div", { className: "text-center text-red-600 p-6", children: error });
    return (_jsxs("div", { className: "min-h-screen bg-white relative pb-24", children: [_jsx("div", { className: "sticky top-0 z-50 bg-white", children: _jsx(Header, {}) }), _jsx("div", { className: "mt-16 sm:mt-20 lg:mt-0" }), _jsxs("div", { className: "flex flex-col lg:flex-row lg:p-6 p-3 gap-4", children: [_jsx("aside", { className: "hidden lg:block lg:w-1/4", children: _jsx(SettingsSidebar, {}) }), _jsxs("main", { className: "relative flex-1 flex flex-col items-center shadow-md rounded-2xl p-4 pb-16 bg-white\r\n                     max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto w-full", children: [_jsx("button", { "aria-label": "M\u00E1s opciones", onClick: () => setMoreOpen((v) => !v), className: "absolute top-2 left-2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow flex items-center justify-center active:scale-95", children: _jsx(FaChevronRight, { className: "text-gray-700" }) }), moreOpen && (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 z-30 bg-black/20", onClick: () => setMoreOpen(false) }), _jsxs("div", { className: "absolute top-12 left-2 z-40 w-48 rounded-xl bg-white shadow-lg ring-1 ring-black/5 overflow-hidden", children: [_jsx("button", { className: "w-full text-left px-4 py-2 hover:bg-gray-50 text-sm", onClick: () => {
                                                    navigate("/calendar", { state: { person: userData } });
                                                    setMoreOpen(false);
                                                }, children: "Agendar cita" }), _jsx("button", { className: "w-full text-left px-4 py-2 hover:bg-gray-50 text-sm", onClick: () => {
                                                    navigate("/chat", { state: { person: userData } });
                                                    setMoreOpen(false);
                                                }, children: "Enviar mensaje" }), _jsx("button", { className: "w-full text-left px-4 py-2 hover:bg-gray-50 text-sm", onClick: handleShare, children: "Compartir perfil" })] })] })), _jsxs("div", { className: "relative w-full h-44 sm:h-52 md:h-56 bg-gray-200 overflow-hidden rounded-b-2xl", children: [_jsx("div", { className: "absolute inset-0 z-0", style: {
                                            backgroundImage: `url(${coverPhoto})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                        } }), _jsxs("label", { className: "absolute top-2 right-2 z-10 bg-white p-2 rounded-full shadow cursor-pointer hover:bg-gray-100", children: [_jsx(FaCamera, { className: "text-gray-700 text-md" }), _jsx("input", { type: "file", className: "hidden", accept: "image/*", onChange: handleCoverPhotoUpload })] })] }), _jsxs("div", { className: "relative -mt-14 sm:-mt-16 z-10", children: [_jsx("img", { src: userData?.image || "/default-profile.jpg", alt: "Profile", className: "w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-4 border-white object-cover shadow-lg mx-auto" }), _jsxs("label", { className: "absolute bottom-0 right-0 bg-white p-1 rounded-full shadow cursor-pointer hover:bg-gray-100", children: [_jsx(FaCamera, { className: "text-gray-700 text-sm" }), _jsx("input", { type: "file", className: "hidden", accept: "image/*", onChange: handleProfilePhotoUpload })] })] }), _jsxs("div", { className: "w-full flex flex-col items-center mt-2", children: [_jsx("h2", { className: "text-lg sm:text-xl font-semibold text-center", children: userData?.name || "Carlos Martinez" }), _jsxs("div", { className: "w-full max-w-[220px] mt-1 flex justify-between px-2", children: [_jsx("p", { className: "text-gray-600 text-xs sm:text-sm", children: userData?.profession || "Fotógrafo" }), _jsxs("div", { className: "flex items-center text-yellow-500 text-xs sm:text-sm", children: [_jsx(FaStar, { className: "text-xs" }), _jsx("span", { className: "ml-1 text-gray-700 font-semibold", children: "4.9" })] })] })] }), _jsxs("div", { className: "flex flex-col items-center gap-2 my-4", children: [_jsxs("div", { className: "flex gap-3", children: [_jsx(IconBtn, { icon: _jsx(FaInstagram, { size: 18 }) }), _jsx(IconBtn, { icon: _jsx(FaFacebook, { size: 18 }) }), _jsx(IconBtn, { icon: _jsx(FaMapMarkerAlt, { size: 18 }) })] }), _jsxs("div", { className: "flex gap-3", children: [_jsx(IconBtn, { icon: _jsx(FaWhatsapp, { size: 18 }) }), _jsx(IconBtn, { icon: _jsx(FaGlobe, { size: 18 }) }), _jsx(IconBtn, { icon: _jsx(FaShareAlt, { size: 18 }) }), _jsx(IconBtnImg, { url: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png", alt: "Uber" })] })] }), _jsx("div", { className: "w-full px-4", children: _jsx("p", { className: "text-xs sm:text-sm text-gray-700 text-center", children: userData?.bio || "Este usuario aún no ha escrito una biografía." }) }), _jsxs("div", { className: "w-full px-4 mt-4", children: [_jsxs("div", { className: "flex justify-between items-center mb-2", children: [_jsx("p", { className: "font-semibold text-red-600 text-sm sm:text-base", children: "Fotos" }), galleryPhotos.length < 5 && (_jsxs("label", { className: "flex items-center px-2 py-1 bg-gray-800 text-white rounded-md cursor-pointer hover:bg-gray-700 text-xs sm:text-sm", children: [_jsx(FaUpload, { className: "mr-1", size: 12 }), "Subir", _jsx("input", { type: "file", className: "hidden", accept: "image/*", multiple: true, onChange: handleGalleryUpload })] }))] }), galleryPhotos.length > 0 ? (_jsx("div", { className: "flex space-x-2 overflow-x-auto pb-2", children: galleryPhotos.map((photo, index) => (_jsx("img", { src: photo, alt: `Gallery ${index}`, className: "w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg shadow-sm" }, index))) })) : (_jsx("div", { className: "bg-gray-100 rounded-lg p-3 text-center", children: _jsx("p", { className: "text-gray-500 text-xs sm:text-sm", children: "No hay fotos todav\u00EDa" }) }))] })] })] }), _jsx(BottomNav, {})] }));
};
export default ProfileSettings;
// Botón con íconos de react-icons
const IconBtn = ({ icon }) => (_jsx("div", { className: "w-10 h-10 sm:w-12 sm:h-12 border border-gray-300 rounded-full flex items-center justify-center text-black hover:bg-gray-100 transition", children: icon }));
// Botón con imagen web (Uber, etc.)
const IconBtnImg = ({ url, alt }) => (_jsx("div", { className: "w-10 h-10 sm:w-12 sm:h-12 border border-gray-300 rounded-full flex items-center justify-center bg-white hover:bg-gray-100 transition", children: _jsx("img", { src: url, alt: alt, className: "w-5 h-5 object-contain" }) }));
