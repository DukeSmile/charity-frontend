import defaultImg from "../../assets/images/icons/default.svg";
import healthImg from "../../assets/images/icons/health.svg";
import educationImg from "../../assets/images/icons/education.svg";
import environmentalImg from "../../assets/images/icons/environmental.svg";
import animalImg from "../../assets/images/icons/animal.svg";
import volunteerImg from "../../assets/images/icons/volunteer.svg";
import yourselfImg from "../../assets/images/icons/yourself.svg";
import familyImg from "../../assets/images/icons/family.svg";

export interface baseIconProp {
    img: any;
}

export const baseIcons: {[key: string]: any} = {
    animal: animalImg,
    education: educationImg,
    emergency: defaultImg,
    environmental: environmentalImg,
    family: familyImg,
    health: healthImg,
    medical: defaultImg,
    memorial: defaultImg,
    nonprofit: defaultImg,
    relief: defaultImg,
    volunteer: volunteerImg,
    yourself: yourselfImg,
}