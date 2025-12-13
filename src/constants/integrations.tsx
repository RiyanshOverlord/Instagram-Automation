import { FaInstagram , FaSalesforce } from 'react-icons/fa';

type Props = {
    title : string,
    icon: React.ReactNode,
    description : string,
    strategy: 'Instagram' | 'CRM'
}

export const INTEGRATIONS_CARDS : Props[] = [
    {
        title : "Connect Instagram",
        description : "Automate your Instagram interactions seamlessly.",
        icon:< FaInstagram size={30} color="purple"/>,
        strategy: 'Instagram'
    },
    {
        title : "Connect Salesforce",
        description : "Integrate Salesforce to streamline your sales processes.",
        icon:< FaSalesforce size={30} color="blue"/>,
        strategy: 'CRM'
    }
]