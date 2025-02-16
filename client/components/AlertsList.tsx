// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Card, CardContent } from "@/components/ui/card";
// import { AlertTriangle, MailWarning, Globe, FileWarning } from "lucide-react";
// import { Button } from "@/components/ui/button";

// interface Alert {
//   type: string;
//   details: {
//     email: string;
//     threat_level: string;
//   };
// }

// const AlertsList = () => {
//   const [alerts, setAlerts] = useState<Alert[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchAlerts();
//   }, []);

//   const fetchAlerts = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get("http://localhost:8000/email-security/malicious-history");
//       console.log("API Response:", response.data);

//       // Extract malicious emails
//       const data = response.data.malicious_emails || [];

//       // Transform the data
//       const formattedAlerts = formatAlerts(data);

//       // Update state
//       setAlerts(formattedAlerts);
//     } catch (error: unknown) {
//       if (axios.isAxiosError(error)) {
//         console.error("Axios Error:", error.message);
//         if (error.response) {
//           console.error("Response Data:", error.response.data);
//           console.error("Status Code:", error.response.status);
//         } else if (error.request) {
//           console.error("No Response Received:", error.request);
//         }
//       } else {
//         console.error("Unexpected Error:", error);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatAlerts = (data: any[]): Alert[] => {
//     return data.map((email) => ({
//       type: "suspicious_email",
//       details: {
//         email: email.email,
//         threat_level: email.threat_level,
//       },
//     }));
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-semibold mb-4">🔍 Security Alerts</h2>

//       {loading ? (
//         <p>Loading alerts...</p>
//       ) : alerts.length === 0 ? (
//         <p>No malicious activity detected 🎉</p>
//       ) : (
//         <div className="space-y-4">
//           {alerts.map((alert, index) => (
//             <Card key={index} className="border border-red-500 shadow-lg">
//               <CardContent className="p-4">
//                 <div className="flex items-center gap-3">
//                   <MailWarning className="text-yellow-600" />
//                   <h3 className="text-lg font-semibold capitalize">Malicious Email</h3>
//                 </div>

//                 <div className="mt-2 p-2 bg-gray-100 rounded">
//                   <p>
//                     <strong>Email:</strong> {alert.details.email}
//                   </p>
//                   <p>
//                     <strong>Threat Level:</strong> {alert.details.threat_level}
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}

//       <Button onClick={fetchAlerts} className="mt-4 bg-red-500 hover:bg-red-600">
//         Refresh Alerts
//       </Button>
//     </div>
//   );
// };

// export default AlertsList;


import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, MailWarning, Shield, ShieldAlert, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmailData {
  email: string;
  subject: string;
  threat_level: string;
  malicious_links: {
    url: string;
    verdict: string;
  }[];
}

const AlertsList = () => {
  const [emailData, setEmailData] = useState<EmailData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/email-security/malicious-history");
      setEmailData(response.data.malicious_emails || []);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios Error:", error.message);
      } else {
        console.error("Unexpected Error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const getThreatBadge = (threatLevel: string) => {
    return threatLevel === "high" ? (
      <div className="flex items-center justify-center text-red-500 gap-1">
        <ShieldAlert className="w-4 h-4" />
        <span>High</span>
      </div>
    ) : (
      <div className="flex items-center justify-center text-green-500 gap-1">
        <Shield className="w-4 h-4" />
        <span>Low</span>
      </div>
    );
  };

  return (
    <div className="p-6">
      <Card className="border-red-200">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <MailWarning className="text-yellow-600 w-6 h-6" />
            <CardTitle className="text-xl font-bold">Email Security Analysis</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center p-4">Loading email data...</div>
          ) : emailData.length === 0 ? (
            <div className="text-center p-4 text-green-600">
              <Shield className="w-8 h-8 mx-auto mb-2" />
              No suspicious emails detected
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-red-50">
                    <th className="p-3 text-left border border-red-200">Sender</th>
                    <th className="p-3 text-left border border-red-200">Subject</th>
                    <th className="p-3 text-center border border-red-200">Threat Level</th>
                    <th className="p-3 text-left border border-red-200">Suspicious Links</th>
                  </tr>
                </thead>
                <tbody>
                  {emailData.map((email, index) => (
                    <tr key={index} className="hover:bg-red-50/50">
                      <td className="p-3 border border-red-200">{email.email}</td>
                      <td className="p-3 border border-red-200">{email.subject}</td>
                      <td className="p-3 border border-red-200">
                        {getThreatBadge(email.threat_level)}
                      </td>
                      <td className="p-3 border border-red-200">
                        <div className="space-y-2">
                          {email.malicious_links.map((link, linkIndex) => (
                            <div key={linkIndex} className="flex items-center gap-2 text-sm">
                              <ExternalLink className="w-4 h-4 flex-shrink-0" />
                              <span 
                                className={`truncate ${
                                  link.verdict === "Malicious" ? "text-red-500" : "text-green-500"
                                }`}
                              >
                                {link.url}
                              </span>
                              <span 
                                className={`flex-shrink-0 font-medium ${
                                  link.verdict === "Malicious" ? "text-red-500" : "text-green-500"
                                }`}
                              >
                                ({link.verdict})
                              </span>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          <Button 
            onClick={fetchEmails} 
            className="mt-4 bg-red-500 hover:bg-red-600"
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            Refresh Security Scan
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlertsList;