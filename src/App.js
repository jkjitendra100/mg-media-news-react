import { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import useAuth, { AuthProvider } from "./context/useAuth";
import { AppAuth } from "./AppAuth";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import Business from "./pages/Business";
import Environment from "./pages/Environment";
import Jharkhand from "./pages/Jharkhand";
import Delhi from "./pages/Delhi";
import Health from "./pages/Health";
import SpecialReport from "./pages/SpecialReport";
import PsmMagazine from "./pages/PsmMagazine";
import Videos from "./pages/Videos";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import Register from "./pages/Register";
import AddPost from "./pages/AddPost";
import PostList from "./pages/PostList";
import { AdminAuth } from "./AdminAuth";
import EditPost from "./pages/EditPost";
import VideoPostDetails from "./pages/VideoPostDetails";
import ImagePostDetails from "./pages/ImagePostDetails";
import ManageTags from "./pages/ManageTags";
import ChangePassword from "./pages/ChangePassword";
import { Helmet } from "react-helmet";
// icon
import logo from "./assets/logo.png";
import ManageAds from "./pages/ManageAds";
import AddNewAd from "./pages/AddNewAd";
import Sports from "./pages/Sports";
import Politics from "./pages/Politics";
import Career from "./pages/Career";
import Crime from "./pages/Crime";
import India from "./pages/India";
import LatestNews from "./pages/LatestNews";
import Entertainment from "./pages/Entertainment";
import ViralNews from "./pages/ViralNews";
import World from "./pages/World";
import Bihar from "./pages/Bihar";
import MadhyaPradesh from "./pages/MadhyaPradesh";
import Maharashtra from "./pages/Maharashtra";
import Manipur from "./pages/Manipur";
import Mizoram from "./pages/Mizoram";
import Meghalaya from "./pages/Meghalaya";
import Nagaland from "./pages/Nagaland";
import Odisha from "./pages/Odisha";
import Punjab from "./pages/Punjab";

function App() {
  const { user } = useAuth();
  const ScrollToTop = (props) => {
    const location = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);

    return <>{props.children}</>;
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <Helmet>
          <title>MG MEDIA NEWS</title>
          <meta
            name="description"
            content="The channels of MG Media News are ingenious and incisive, and they focus on providing the 
            Indian population with timely, accurate, and reliable news."
          />
          <meta
            name="keywords"
            content="mg news, news, latest news, delhi news, ranchi news, jharkhand news, hindi news, current news"
          />
          <link rel="icon" href={logo} />
        </Helmet>
        <ScrollToTop>
          <Routes>
            {/* Normal User Access Pages */}
            <Route path="/" element={<AppAuth />}>
              <Route path="" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<Register />} />
              {/* <Route path="home" element={<HomePage />} /> */}
              <Route path="profile" element={<ProfilePage />} />
              <Route path="business" element={<Business />} />
              <Route path="environment" element={<Environment />} />
              <Route path="jharkhand" element={<Jharkhand />} />
              <Route path="delhi" element={<Delhi />} />
              <Route path="health" element={<Health />} />
              <Route path="specialReport" element={<SpecialReport />} />
              <Route path="psmMagazine" element={<PsmMagazine />} />
              <Route path="videos" element={<Videos />} />
              <Route path="userDashboard" element={<UserDashboard />} />
              <Route path="videoPostDetails" element={<VideoPostDetails />} />
              <Route path="imagePostDetails" element={<ImagePostDetails />} />
              <Route path="sports" element={<Sports />} />
              <Route path="politics" element={<Politics />} />
              <Route path="career" element={<Career />} />
              <Route path="crime" element={<Crime />} />
              <Route path="india" element={<India />} />
              <Route path="latestNews" element={<LatestNews />} />
              <Route path="entertainment" element={<Entertainment />} />
              <Route path="viralNews" element={<ViralNews />} />
              <Route path="world" element={<World />} />
              <Route path="bihar" element={<Bihar />} />
              <Route path="madhyaPradesh" element={<MadhyaPradesh />} />
              <Route path="maharashtra" element={<Maharashtra />} />
              <Route path="manipur" element={<Manipur />} />
              <Route path="mizoram" element={<Mizoram />} />
              <Route path="meghalaya" element={<Meghalaya />} />
              <Route path="nagaland" element={<Nagaland />} />
              <Route path="odisha" element={<Odisha />} />
              <Route path="punjab" element={<Punjab />} />
            </Route>

            {/* Admin Access Pages */}
            <Route path="/" element={<AdminAuth />}>
              <Route path="adminDashboard" element={<AdminDashboard />} />
              <Route path="addPost" element={<AddPost />} />
              <Route path="postList" element={<PostList />} />
              <Route path="editPost" element={<EditPost />} />
              <Route path="manageTags" element={<ManageTags />} />
              <Route path="changePassword" element={<ChangePassword />} />
              <Route path="manageAds" element={<ManageAds />} />
              <Route path="addNewAd" element={<AddNewAd />} />
            </Route>
          </Routes>
        </ScrollToTop>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
