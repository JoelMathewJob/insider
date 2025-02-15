// import { useState, useEffect, useRef } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Info, Filter, BarChart2, Search, Download } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// interface Packet {
//   Timestamp: string;
//   "Packet Length": number;
//   "Source IP": string;
//   "Destination IP": string;
//   Protocol: number;
//   "IP Flags": string;
//   "Source Port": number;
//   "Destination Port": number;
//   "TCP Flags": string | null;
//   "Host (HTTP)": string | null;
//   "User-Agent (HTTP)": string | null;
//   "Request Method": string | null;
//   "URL": string | null;
//   "DNS Queries": string | null;
//   "FTP Detected": boolean;
//   "Unusual Ports": boolean;
//   "Large Packets": boolean;
//   "Protocol Mismatch": boolean;
//   "Multiple Login Attempts": boolean;
// }

// interface PacketStats {
//   totalPackets: number;
//   protocols: { [key: string]: number };
//   avgPacketSize: number;
//   threatCount: number;
// }

// export function LivePacketLogs() {
//   const [packets, setPackets] = useState<Packet[]>([]);
//   const [selectedPacket, setSelectedPacket] = useState<Packet | null>(null);
//   const [filterQuery, setFilterQuery] = useState("");
//   const [showStats, setShowStats] = useState(false);
//   const tableRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     fetch("/data/simulated_packets.json")
//       .then((res) => res.json())
//       .then((data) => setPackets(data));
//   }, []);

//   // Real-time updates simulation
//   useEffect(() => {
//     if (packets.length === 0) return;
    
//     let index = 0;
//     const interval = setInterval(() => {
//       setPackets((prevPackets) => {
//         if (index < packets.length) {
//           return [packets[index++], ...prevPackets];
//         }
//         return prevPackets;
//       });
//     }, 2000);

//     return () => clearInterval(interval);
//   }, [packets]);

//   const getProtocolColor = (protocol: number) => {
//     switch (protocol) {
//       case 6: return "text-blue-600";
//       case 17: return "text-green-600";
//       default: return "text-gray-600";
//     }
//   };

//   const getProtocolName = (protocol: number) => {
//     switch (protocol) {
//       case 6: return "TCP";
//       case 17: return "UDP";
//       default: return protocol.toString();
//     }
//   };

//   const calculateStats = (): PacketStats => {
//     const stats = {
//       totalPackets: packets.length,
//       protocols: {} as { [key: string]: number },
//       avgPacketSize: 0,
//       threatCount: 0
//     };

//     let totalSize = 0;
//     packets.forEach(packet => {
//       const protocol = getProtocolName(packet.Protocol);
//       stats.protocols[protocol] = (stats.protocols[protocol] || 0) + 1;
//       totalSize += packet["Packet Length"];
      
//       if (packet["Large Packets"] || packet["Unusual Ports"] || 
//           packet["Protocol Mismatch"] || packet["FTP Detected"] || 
//           packet["Multiple Login Attempts"]) {
//         stats.threatCount++;
//       }
//     });

//     stats.avgPacketSize = Math.round(totalSize / packets.length);
//     return stats;
//   };

//   const filteredPackets = packets.filter(packet => {
//     if (!filterQuery) return true;
//     const query = filterQuery.toLowerCase();
//     return (
//       packet["Source IP"].includes(query) ||
//       packet["Destination IP"].includes(query) ||
//       packet["Host (HTTP)"]?.toLowerCase().includes(query) ||
//       getProtocolName(packet.Protocol).toLowerCase().includes(query)
//     );
//   });

//   const decodeHttpPacket = (packet: Packet) => {
//     if (!packet["Host (HTTP)"]) return null;
//     return (
//       <div className="mt-4 space-y-2 bg-white p-3 rounded-lg">
//         <div className="font-medium text-blue-600">HTTP Request</div>
//         <div className="font-mono text-sm">
//           {packet["Request Method"]} {packet["URL"]} HTTP/1.1
//           {"\n"}Host: {packet["Host (HTTP)"]}
//           {"\n"}User-Agent: {packet["User-Agent (HTTP)"]}
//         </div>
//       </div>
//     );
//   };

//   const decodeTcpFlags = (flags: string | null) => {
//     if (!flags) return null;
//     const flagMeanings: { [key: string]: string } = {
//       'S': 'SYN',
//       'A': 'ACK',
//       'F': 'FIN',
//       'R': 'RST',
//       'P': 'PSH',
//       'U': 'URG'
//     };
//     return flags.split('').map(flag => flagMeanings[flag] || flag).join(' ');
//   };

//   return (
//     <div className="space-y-4">
//       <Card className="w-full">
//         <CardHeader className="pb-2">
//           <div className="flex justify-between items-center">
//             <CardTitle className="text-lg flex items-center gap-2">
//               <Info className="w-5 h-5" />
//               Network Traffic Analyzer
//             </CardTitle>
//             <div className="flex gap-2">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => setShowStats(!showStats)}
//                 className="flex items-center gap-2"
//               >
//                 <BarChart2 className="w-4 h-4" />
//                 Statistics
//               </Button>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className="flex items-center gap-2"
//               >
//                 <Download className="w-4 h-4" />
//                 Export
//               </Button>
//             </div>
//           </div>
//           <div className="flex gap-2 mt-4">
//             <div className="relative flex-1">
//               <Search className="w-4 h-4 absolute left-2 top-2.5 text-gray-500" />
//               <Input
//                 placeholder="Filter packets... (IP, Protocol, Host)"
//                 value={filterQuery}
//                 onChange={(e) => setFilterQuery(e.target.value)}
//                 className="pl-8"
//               />
//             </div>
//             <Badge className="bg-blue-100 text-blue-800 h-9 px-4">
//               {filteredPackets.length} packets
//             </Badge>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {showStats && (
//               <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                   {Object.entries(calculateStats()).map(([key, value]) => (
//                     key !== 'protocols' ? (
//                       <div key={key} className="bg-white p-3 rounded-lg">
//                         <div className="text-sm text-gray-600">
//                           {key.replace(/([A-Z])/g, ' $1').trim()}
//                         </div>
//                         <div className="text-2xl font-medium text-black">
//                           {typeof value === 'number' ? value.toLocaleString() : value}
//                         </div>
//                       </div>
//                     ) : null
//                   ))}
//                 </div>
//               </div>
//             )}
            
//             <div className="h-[600px] overflow-auto border rounded-lg" ref={tableRef}>
//               <table className="w-full border-collapse text-sm">
//                 <thead className="bg-gray-100 sticky top-0 text- black">
//                   <tr>
//                     <th className="border-b px-3 py-2 text-left">No.</th>
//                     <th className="border-b px-3 py-2 text-left">Time</th>
//                     <th className="border-b px-3 py-2 text-left">Source</th>
//                     <th className="border-b px-3 py-2 text-left">Destination</th>
//                     <th className="border-b px-3 py-2 text-left">Protocol</th>
//                     <th className="border-b px-3 py-2 text-left">Length</th>
//                     <th className="border-b px-3 py-2 text-left">Info</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredPackets.map((packet, i) => (
//                     <tr 
//                       key={i} 
//                       className={`hover:bg-blue-50 cursor-pointer transition ${
//                         selectedPacket === packet ? 'bg-blue-100' : ''
//                       }`}
//                       onClick={() => setSelectedPacket(packet)}
//                     >
//                       <td className="border-b px-3 py-1 font-mono">{i + 1}</td>
//                       <td className="border-b px-3 py-1 font-mono">{packet.Timestamp.split(' ')[1]}</td>
//                       <td className="border-b px-3 py-1 font-mono">
//                         {packet["Source IP"]}:{packet["Source Port"]}
//                       </td>
//                       <td className="border-b px-3 py-1 font-mono">
//                         {packet["Destination IP"]}:{packet["Destination Port"]}
//                       </td>
//                       <td className={`border-b px-3 py-1 font-medium ${getProtocolColor(packet.Protocol)}`}>
//                         {getProtocolName(packet.Protocol)}
//                       </td>
//                       <td className="border-b px-3 py-1 font-mono">{packet["Packet Length"]}</td>
//                       <td className="border-b px-3 py-1">
//                         {packet["Host (HTTP)"] && 
//                           `HTTP ${packet["Request Method"]} ${packet["URL"]} (Host: ${packet["Host (HTTP)"]})`
//                         }
//                         {packet["TCP Flags"] && !packet["Host (HTTP)"] && 
//                           `Flags: ${decodeTcpFlags(packet["TCP Flags"])}`
//                         }
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {selectedPacket && (
//               <div className="border rounded-lg p-4 h-[600px] overflow-auto bg-gray-50">
//                 <h3 className="font-medium mb-4">Packet Details</h3>
//                 <div className="space-y-2 text-sm">
//                   <div className="grid grid-cols-2 gap-x-4">
//                     <div className="font-medium">Timestamp</div>
//                     <div className="font-mono">{selectedPacket.Timestamp}</div>
//                   </div>
                  
//                   <div className="mt-4 font-medium">IP Header</div>
//                   <div className="grid grid-cols-2 gap-x-4">
//                     <div className="font-medium">Source</div>
//                     <div className="font-mono">{selectedPacket["Source IP"]}:{selectedPacket["Source Port"]}</div>
//                   </div>
//                   <div className="grid grid-cols-2 gap-x-4">
//                     <div className="font-medium">Destination</div>
//                     <div className="font-mono">{selectedPacket["Destination IP"]}:{selectedPacket["Destination Port"]}</div>
//                   </div>
//                   <div className="grid grid-cols-2 gap-x-4">
//                     <div className="font-medium">IP Flags</div>
//                     <div className="font-mono">{selectedPacket["IP Flags"]}</div>
//                   </div>
                  
//                   <div className="mt-4 font-medium">Transport Layer</div>
//                   <div className="grid grid-cols-2 gap-x-4">
//                     <div className="font-medium">Protocol</div>
//                     <div className="font-mono">{getProtocolName(selectedPacket.Protocol)}</div>
//                   </div>
//                   <div className="grid grid-cols-2 gap-x-4">
//                     <div className="font-medium">TCP Flags</div>
//                     <div className="font-mono">{decodeTcpFlags(selectedPacket["TCP Flags"]) || "--"}</div>
//                   </div>
//                   <div className="grid grid-cols-2 gap-x-4">
//                     <div className="font-medium">Packet Length</div>
//                     <div className="font-mono">{selectedPacket["Packet Length"]} bytes</div>
//                   </div>

//                   {selectedPacket["Host (HTTP)"] && decodeHttpPacket(selectedPacket)}

//                   <div className="mt-4 font-medium">Security Analysis</div>
//                   <div className="flex flex-wrap gap-2">
//                     {selectedPacket["Large Packets"] && (
//                       <Badge className="bg-red-500">Large Packet ({selectedPacket["Packet Length"]} bytes)</Badge>
//                     )}
//                     {selectedPacket["Unusual Ports"] && (
//                       <Badge className="bg-yellow-500">Unusual Port ({selectedPacket["Destination Port"]})</Badge>
//                     )}
//                     {selectedPacket["Protocol Mismatch"] && <Badge className="bg-orange-500">Protocol Mismatch</Badge>}
//                     {selectedPacket["FTP Detected"] && <Badge className="bg-red-700">FTP Traffic</Badge>}
//                     {selectedPacket["Multiple Login Attempts"] && <Badge className="bg-purple-500">Multiple Login Attempts</Badge>}
//                     {!selectedPacket["Large Packets"] && 
//                      !selectedPacket["Unusual Ports"] && 
//                      !selectedPacket["Protocol Mismatch"] && 
//                      !selectedPacket["FTP Detected"] && 
//                      !selectedPacket["Multiple Login Attempts"] && 
//                      <span className="text-green-600">No security concerns detected</span>
//                     }
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default LivePacketLogs;



"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Info, BarChart2, Search, Download } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Packet {
  Timestamp: string
  "Packet Length": number
  "Source IP": string
  "Destination IP": string
  Protocol: number
  "IP Flags": string
  "Source Port": number
  "Destination Port": number
  "TCP Flags": string | null
  "Host (HTTP)": string | null
  "User-Agent (HTTP)": string | null
  "Request Method": string | null
  URL: string | null
  "DNS Queries": string | null
  "FTP Detected": boolean
  "Unusual Ports": boolean
  "Large Packets": boolean
  "Protocol Mismatch": boolean
  "Multiple Login Attempts": boolean
}

interface PacketStats {
  totalPackets: number
  protocols: { [key: string]: number }
  avgPacketSize: number
  threatCount: number
}

export function LivePacketLogs() {
  const [packets, setPackets] = useState<Packet[]>([])
  const [selectedPacket, setSelectedPacket] = useState<Packet | null>(null)
  const [filterQuery, setFilterQuery] = useState("")
  const [showStats, setShowStats] = useState(false)
  const tableRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch("/data/simulated_packets.json")
      .then((res) => res.json())
      .then((data) => setPackets(data))
  }, [])

  // Real-time updates simulation
  useEffect(() => {
    if (packets.length === 0) return

    let index = 0
    const interval = setInterval(() => {
      setPackets((prevPackets) => {
        if (index < packets.length) {
          return [packets[index++], ...prevPackets]
        }
        return prevPackets
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [packets])

  const getProtocolColor = (protocol: number) => {
    switch (protocol) {
      case 6:
        return "text-blue-600"
      case 17:
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  const getProtocolName = (protocol: number) => {
    switch (protocol) {
      case 6:
        return "TCP"
      case 17:
        return "UDP"
      default:
        return protocol.toString()
    }
  }

  const calculateStats = (): PacketStats => {
    const stats = {
      totalPackets: packets.length,
      protocols: {} as { [key: string]: number },
      avgPacketSize: 0,
      threatCount: 0,
    }

    let totalSize = 0
    packets.forEach((packet) => {
      const protocol = getProtocolName(packet.Protocol)
      stats.protocols[protocol] = (stats.protocols[protocol] || 0) + 1
      totalSize += packet["Packet Length"]

      if (
        packet["Large Packets"] ||
        packet["Unusual Ports"] ||
        packet["Protocol Mismatch"] ||
        packet["FTP Detected"] ||
        packet["Multiple Login Attempts"]
      ) {
        stats.threatCount++
      }
    })

    stats.avgPacketSize = Math.round(totalSize / packets.length)
    return stats
  }

  const filteredPackets = packets.filter((packet) => {
    if (!filterQuery) return true
    const query = filterQuery.toLowerCase()
    return (
      packet["Source IP"].includes(query) ||
      packet["Destination IP"].includes(query) ||
      packet["Host (HTTP)"]?.toLowerCase().includes(query) ||
      getProtocolName(packet.Protocol).toLowerCase().includes(query)
    )
  })

  const decodeHttpPacket = (packet: Packet) => {
    if (!packet["Host (HTTP)"]) return null
    return (
      <div className="mt-4 space-y-2 bg-white p-3 rounded-lg">
        <div className="font-medium text-blue-600">HTTP Request</div>
        <div className="font-mono text-sm">
          {packet["Request Method"]} {packet["URL"]} HTTP/1.1
          {"\n"}Host: {packet["Host (HTTP)"]}
          {"\n"}User-Agent: {packet["User-Agent (HTTP)"]}
        </div>
      </div>
    )
  }

  const decodeTcpFlags = (flags: string | null) => {
    if (!flags) return null
    const flagMeanings: { [key: string]: string } = {
      S: "SYN",
      A: "ACK",
      F: "FIN",
      R: "RST",
      P: "PSH",
      U: "URG",
    }
    return flags
      .split("")
      .map((flag) => flagMeanings[flag] || flag)
      .join(" ")
  }

  return (
    <div className="space-y-4">
      <Card className="w-full">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center gap-2">
              <Info className="w-5 h-5" />
              Network Traffic Analyzer
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowStats(!showStats)}
                className="flex items-center gap-2"
              >
                <BarChart2 className="w-4 h-4" />
                Statistics
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-2 top-2.5 text-gray-500" />
              <Input
                placeholder="Filter packets... (IP, Protocol, Host)"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Badge className="bg-blue-100 text-blue-800 h-9 px-4">{filteredPackets.length} packets</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="">
            {showStats && (
              <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(calculateStats()).map(([key, value]) =>
                    key !== "protocols" ? (
                      <div key={key} className="bg-white p-3 rounded-lg">
                        <div className="text-sm text-gray-600">{key.replace(/([A-Z])/g, " $1").trim()}</div>
                        <div className="text-2xl font-medium text-black">
                          {typeof value === "number" ? value.toLocaleString() : value}
                        </div>
                      </div>
                    ) : null,
                  )}
                </div>
              </div>
            )}

            <ScrollArea className="h-[400px] border rounded-lg">
              <table className="w-full border-collapse text-sm">
                <thead className="bg-gray-700 sticky top-0 text-center">
                  <tr>
                    <th className="border-b px-3 py-2 ">No.</th>
                    <th className="border-b px-3 py-2 ">Time</th>
                    <th className="border-b px-3 py-2 ">Source</th>
                    <th className="border-b px-3 py-2 ">Destination</th>
                    <th className="border-b px-3 py-2 ">Protocol</th>
                    <th className="border-b px-3 py-2">Length</th>
                    <th className="border-b px-3 py-2">Info</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPackets.map((packet, i) => (
                    <tr
                      key={i}
                      className={`hover:bg-gray-500 cursor-pointer transition ${
                        selectedPacket === packet ? "bg-gray-600" : ""
                      }`}
                      onClick={() => setSelectedPacket(packet)}
                    >
                      <td className="border-b px-3 py-1 font-mono">{i + 1}</td>
                      <td className="border-b px-3 py-1 font-mono">{packet.Timestamp.split(" ")[1]}</td>
                      <td className="border-b px-3 py-1 font-mono">
                        {packet["Source IP"]}:{packet["Source Port"]}
                      </td>
                      <td className="border-b px-3 py-1 font-mono">
                        {packet["Destination IP"]}:{packet["Destination Port"]}
                      </td>
                      <td className={`border-b px-3 py-1 font-medium ${getProtocolColor(packet.Protocol)}`}>
                        {getProtocolName(packet.Protocol)}
                      </td>
                      <td className="border-b px-3 py-1 font-mono">{packet["Packet Length"]}</td>
                      <td className="border-b px-3 py-1">
                        {packet["Host (HTTP)"] &&
                          `HTTP ${packet["Request Method"]} ${packet["URL"]} (Host: ${packet["Host (HTTP)"]})`}
                        {packet["TCP Flags"] &&
                          !packet["Host (HTTP)"] &&
                          `Flags: ${decodeTcpFlags(packet["TCP Flags"])}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ScrollArea>

            {selectedPacket && (
              <ScrollArea className="border rounded-lg p-4 h-[400px] bg-gray-600">
                <h3 className="font-medium mb-4">Packet Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-2 gap-x-4">
                    <div className="font-medium">Timestamp</div>
                    <div className="font-mono">{selectedPacket.Timestamp}</div>
                  </div>

                  <div className="mt-4 font-medium">IP Header</div>
                  <div className="grid grid-cols-2 gap-x-4">
                    <div className="font-medium">Source</div>
                    <div className="font-mono">
                      {selectedPacket["Source IP"]}:{selectedPacket["Source Port"]}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4">
                    <div className="font-medium">Destination</div>
                    <div className="font-mono">
                      {selectedPacket["Destination IP"]}:{selectedPacket["Destination Port"]}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4">
                    <div className="font-medium">IP Flags</div>
                    <div className="font-mono">{selectedPacket["IP Flags"]}</div>
                  </div>

                  <div className="mt-4 font-medium">Transport Layer</div>
                  <div className="grid grid-cols-2 gap-x-4">
                    <div className="font-medium">Protocol</div>
                    <div className="font-mono">{getProtocolName(selectedPacket.Protocol)}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4">
                    <div className="font-medium">TCP Flags</div>
                    <div className="font-mono">{decodeTcpFlags(selectedPacket["TCP Flags"]) || "--"}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4">
                    <div className="font-medium">Packet Length</div>
                    <div className="font-mono">{selectedPacket["Packet Length"]} bytes</div>
                  </div>

                  {selectedPacket["Host (HTTP)"] && decodeHttpPacket(selectedPacket)}

                  <div className="mt-4 font-medium">Security Analysis</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedPacket["Large Packets"] && (
                      <Badge className="bg-red-500">Large Packet ({selectedPacket["Packet Length"]} bytes)</Badge>
                    )}
                    {selectedPacket["Unusual Ports"] && (
                      <Badge className="bg-yellow-500">Unusual Port ({selectedPacket["Destination Port"]})</Badge>
                    )}
                    {selectedPacket["Protocol Mismatch"] && <Badge className="bg-orange-500">Protocol Mismatch</Badge>}
                    {selectedPacket["FTP Detected"] && <Badge className="bg-red-700">FTP Traffic</Badge>}
                    {selectedPacket["Multiple Login Attempts"] && (
                      <Badge className="bg-purple-500">Multiple Login Attempts</Badge>
                    )}
                    {!selectedPacket["Large Packets"] &&
                      !selectedPacket["Unusual Ports"] &&
                      !selectedPacket["Protocol Mismatch"] &&
                      !selectedPacket["FTP Detected"] &&
                      !selectedPacket["Multiple Login Attempts"] && (
                        <span className="text-green-600">No security concerns detected</span>
                      )}
                  </div>
                </div>
              </ScrollArea>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LivePacketLogs

