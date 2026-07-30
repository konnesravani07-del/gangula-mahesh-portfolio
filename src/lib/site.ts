import certEtabsImg from "@/assets/cert-etabs.jpg";
import certAutocadImg from "@/assets/cert-autocad.jpg";
import certConferenceImg from "@/assets/cert-conference.jpg";
import resumeAsset from "@/assets/resume.pdf.asset.json";
import profileAsset from "@/assets/Mahesh-Profile.jpg";

export const SITE = {
  name: "Gangula Mahesh",
  initials: "GM",
  role: "Civil Site Engineer",
  tagline:
    "Civil Engineer passionate about construction, site execution and quality engineering.",
  phone: "+91 79952 13551",
  phoneIntl: "+917995213551",
  whatsapp: "917995213551",
  email: "Maheshgangula174@gmail.com",
  location: {
    line: "Appajipeta (V), Nalgonda (M, Dist)",
    city: "Nalgonda",
    state: "Telangana",
    pincode: "508001",
    country: "India",
  },
} as const;

export const ASSETS = {
  profile: profileAsset,
  resume: "/MAHESH UPDATE RESUME.pdf",
  resumeFilename: "MAHESH UPDATE RESUME.pdf",
  certificates: [
    {
      id: "etabs",
      title: "ETABS & Quantity Surveying Internship",
      issuer: "CIVIL Edu",
      date: "Aug – Oct 2022",
      url: "/cert-etabs.pdf",
    },
    {
      id: "autocad",
      title: "AutoCAD-2D Online Workshop",
      issuer: "Learn Delta",
      date: "July 2022",
      url: "/cert-autocad.pdf",
    },
    {
      id: "ncice",
      title: "10th National Conference on Innovation in Civil Engineering",
      issuer: "Karpagam Academy of Higher Education",
      date: "March 2023",
      url: "/cert-conference.pdf",
    },
  ],
} as const;

export const telLink = `tel:${SITE.phoneIntl}`;
export const mailLink = `mailto:${SITE.email}`;
export const waLink = (msg = "Hi Mahesh, I came across your portfolio and would like to connect.") =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
