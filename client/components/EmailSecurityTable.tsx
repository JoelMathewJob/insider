import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface MaliciousEmail {
  email: string;
  subject: string;
  threat_level: string;
  malicious_links: { url: string; verdict: string }[];
}

const EmailSecurityTable = () => {
  const [emails, setEmails] = useState<MaliciousEmail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/email-security/malicious-history");
      setEmails(response.data.malicious_emails || []);
    } catch (error) {
      console.error("Error fetching emails:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">📧 Email Security Analysis</h2>

      {loading ? (
        <p>Loading emails...</p>
      ) : emails.length === 0 ? (
        <p>No emails found.</p>
      ) : (
        <Table className="border rounded-lg shadow-md">
          <TableHeader>
            <TableRow className="bg-gray-200">
              <TableHead>Email</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Threat Level</TableHead>
              <TableHead>Malicious Links</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {emails.map((email, index) => (
              <TableRow key={index} className={email.threat_level === "high" ? "bg-red-100" : ""}>
                <TableCell>{email.email}</TableCell>
                <TableCell>{email.subject}</TableCell>
                <TableCell className={`font-bold ${email.threat_level === "high" ? "text-red-600" : "text-green-600"}`}>
                  {email.threat_level}
                </TableCell>
                <TableCell>
                  {email.malicious_links.length > 0 ? (
                    <ul>
                      {email.malicious_links.map((link, i) => (
                        <li key={i} className={link.verdict === "Malicious" ? "text-red-500 font-semibold" : ""}>
                          {link.url} ({link.verdict})
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "No malicious links"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Button onClick={fetchEmails} className="mt-4 bg-blue-500 hover:bg-blue-600">
        Refresh Emails
      </Button>
    </div>
  );
};

export default EmailSecurityTable;
