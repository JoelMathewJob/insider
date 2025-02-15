"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Info, BarChart2, Search, Download, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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

interface ExportFormat {
  csv: string
  json: string
  pcap: Uint8Array
}

export function LivePacketLogs() {
  const [packets, setPackets] = useState<Packet[]>([])
  const [selectedPacket, setSelectedPacket] = useState<Packet | null>(null)
  const [filterQuery, setFilterQuery] = useState("")
  const [showStats, setShowStats] = useState(false)
  const tableRef = useRef<HTMLDivElement>(null)
  const exportTimeoutRef = useRef<NodeJS.Timeout>()
  const [isExportOpen, setIsExportOpen] = useState(false)

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

  const generateDataset = (format: 'csv' | 'json' | 'pcap'): ExportFormat[keyof ExportFormat] => {
    const filteredData = filterQuery ? filteredPackets : packets;

    switch (format) {
      case 'csv': {
        const headers = [
          'Timestamp',
          'Source IP',
          'Source Port',
          'Destination IP',
          'Destination Port',
          'Protocol',
          'Packet Length',
          'TCP Flags',
          'Host (HTTP)',
          'Request Method',
          'URL'
        ].join(',');

        const rows = filteredData.map(packet => [
          packet.Timestamp,
          packet['Source IP'],
          packet['Source Port'],
          packet['Destination IP'],
          packet['Destination Port'],
          getProtocolName(packet.Protocol),
          packet['Packet Length'],
          packet['TCP Flags'] || '',
          packet['Host (HTTP)'] || '',
          packet['Request Method'] || '',
          packet['URL'] || ''
        ].map(field => `"${field}"`).join(','));

        return [headers, ...rows].join('\n');
      }

      case 'json': {
        const jsonData = filteredData.map(packet => ({
          timestamp: packet.Timestamp,
          source: {
            ip: packet['Source IP'],
            port: packet['Source Port']
          },
          destination: {
            ip: packet['Destination IP'],
            port: packet['Destination Port']
          },
          protocol: getProtocolName(packet.Protocol),
          length: packet['Packet Length'],
          flags: packet['TCP Flags'],
          http: packet['Host (HTTP)'] ? {
            host: packet['Host (HTTP)'],
            method: packet['Request Method'],
            url: packet['URL']
          } : null,
          security: {
            largePacket: packet['Large Packets'],
            unusualPorts: packet['Unusual Ports'],
            protocolMismatch: packet['Protocol Mismatch'],
            ftpDetected: packet['FTP Detected'],
            multipleLoginAttempts: packet['Multiple Login Attempts']
          }
        }));
        return JSON.stringify(jsonData, null, 2);
      }

      case 'pcap': {
        // Create a basic PCAP file structure
        const pcapHeader = new Uint8Array([
          0xd4, 0xc3, 0xb2, 0xa1, // Magic number
          0x02, 0x00, 0x04, 0x00, // Version
          0x00, 0x00, 0x00, 0x00, // Timezone
          0x00, 0x00, 0x00, 0x00, // Accuracy
          0xff, 0xff, 0x00, 0x00, // Snap length
          0x01, 0x00, 0x00, 0x00  // Link type (Ethernet)
        ]);

        // Convert packet data to PCAP format
        const packetBuffers = filteredData.map(packet => {
          const timestamp = new Date(packet.Timestamp).getTime() / 1000;
          const packetLength = packet['Packet Length'];
          
          // Simplified packet header
          const packetHeader = new Uint8Array([
            ...new Uint8Array(new Uint32Array([Math.floor(timestamp)]).buffer),
            ...new Uint8Array(new Uint32Array([Math.floor((timestamp % 1) * 1000000)]).buffer),
            ...new Uint8Array(new Uint32Array([packetLength]).buffer),
            ...new Uint8Array(new Uint32Array([packetLength]).buffer),
          ]);
          

          return packetHeader;
        });

        // Combine headers and packet data
        const packetData = packetBuffers.reduce(
          (acc, curr) => new Uint8Array([...acc, ...curr]), 
          new Uint8Array()
        );
        
        return new Uint8Array([...pcapHeader, ...packetData]);
      }
    }
  };

  const downloadDataset = (format: 'csv' | 'json' | 'pcap') => {
    const data = generateDataset(format);
    const mimeTypes = {
      csv: 'text/csv',
      json: 'application/json',
      pcap: 'application/vnd.tcpdump.pcap'
    };

    const blob = new Blob([data], { type: mimeTypes[format] });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `network_logs_${new Date().toISOString()}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    return () => {
      if (exportTimeoutRef.current) {
        clearTimeout(exportTimeoutRef.current)
      }
    }
  }, [])


  const handleDownload = (format: 'csv' | 'json' | 'pcap') => {
    downloadDataset(format)
    if (exportTimeoutRef.current) {
      clearTimeout(exportTimeoutRef.current)
    }
    exportTimeoutRef.current = setTimeout(() => {
      setIsExportOpen(false)
    }, 500)
  }

  // Replace the existing Export button with this new version
  const ExportButton = () => (
    <DropdownMenu open={isExportOpen} onOpenChange={setIsExportOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => downloadDataset('csv')}>
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => downloadDataset('json')}>
          Export as JSON
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => downloadDataset('pcap')}>
          Export as PCAP
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="">
      <Card className="w-full border-none">
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
              <ExportButton />
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
            {/* {showStats && (
              <div className="md:col-span-2 bg-gray-500 p-4 rounded-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(calculateStats()).map(([key, value]) =>
                    key !== "protocols" ? (
                      <div key={key} className="bg-gray-200 p-3 rounded-lg">
                        <div className="text-sm text-gray-600">{key.replace(/([A-Z])/g, " $1").trim()}</div>
                        <div className="text-2xl font-medium text-black">
                          {typeof value === "number" ? value.toLocaleString() : value}
                        </div>
                      </div>
                    ) : null,
                  )}
                </div>
              </div>
            )} */}

            <ScrollArea className="h-[320px] border rounded-lg">
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
                      className={`hover:bg-gray-500 cursor-pointer transition ${selectedPacket === packet ? "bg-gray-600" : ""
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
              <div className="relative border rounded-lg bg-gray-900 text-gray-100">
                

                <ScrollArea className="h-[400px] p-4">
                <button
                  className="absolute right-7 top-3 p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  aria-label="Close"
                  onClick={() => {
                    console.log("Close button clicked");
                    setSelectedPacket(null);
                  }}
                >
                  <X className="h-4 w-4 text-white" />
                </button>
                  <h3 className="font-medium text-lg text-gray-100 mb-6">Packet Details</h3>

                  <div className="space-y-6 text-sm">
                    {/* Frame Info */}
                    <div className="bg-gray-800 rounded-lg p-3">
                      <div className="text-blue-400 font-medium mb-2">Frame Information</div>
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-x-4">
                          <div className="text-gray-400">Timestamp</div>
                          <div className="font-mono text-gray-100">{selectedPacket.Timestamp}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4">
                          <div className="text-gray-400">Frame Length</div>
                          <div className="font-mono text-gray-100">{selectedPacket["Packet Length"]} bytes</div>
                        </div>
                      </div>
                    </div>

                    {/* IP Header */}
                    <div className="bg-gray-800 rounded-lg p-3">
                      <div className="text-blue-400 font-medium mb-2">Internet Protocol</div>
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-x-4">
                          <div className="text-gray-400">Source</div>
                          <div className="font-mono text-gray-100">{selectedPacket["Source IP"]}:{selectedPacket["Source Port"]}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4">
                          <div className="text-gray-400">Destination</div>
                          <div className="font-mono text-gray-100">{selectedPacket["Destination IP"]}:{selectedPacket["Destination Port"]}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4">
                          <div className="text-gray-400">IP Flags</div>
                          <div className="font-mono text-gray-100">{selectedPacket["IP Flags"]}</div>
                        </div>
                      </div>
                    </div>

                    {/* Transport Layer */}
                    <div className="bg-gray-800 rounded-lg p-3">
                      <div className="text-blue-400 font-medium mb-2">Transport Layer</div>
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-x-4">
                          <div className="text-gray-400">Protocol</div>
                          <div className="font-mono text-gray-100">{getProtocolName(selectedPacket.Protocol)}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4">
                          <div className="text-gray-400">TCP Flags</div>
                          <div className="font-mono text-gray-100">{decodeTcpFlags(selectedPacket["TCP Flags"]) || "--"}</div>
                        </div>
                      </div>
                    </div>

                    {/* HTTP Details if present */}
                    {selectedPacket["Host (HTTP)"] && (
                      <div className="bg-gray-800 rounded-lg p-3">
                        <div className="text-blue-400 font-medium mb-2">HTTP Protocol</div>
                        <div className="space-y-2">
                          <div className="grid grid-cols-2 gap-x-4">
                            <div className="text-gray-400">Host</div>
                            <div className="font-mono text-gray-100">{selectedPacket["Host (HTTP)"]}</div>
                          </div>
                          <div className="grid grid-cols-2 gap-x-4">
                            <div className="text-gray-400">Method</div>
                            <div className="font-mono text-gray-100">{selectedPacket["Request Method"]}</div>
                          </div>
                          <div className="grid grid-cols-2 gap-x-4">
                            <div className="text-gray-400">URL</div>
                            <div className="font-mono text-gray-100 break-all">{selectedPacket["URL"]}</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Security Analysis */}
                    <div className="bg-gray-800 rounded-lg p-3">
                      <div className="text-blue-400 font-medium mb-2">Security Analysis</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedPacket["Large Packets"] && (
                          <Badge className="bg-red-900 text-red-100">
                            Large Packet ({selectedPacket["Packet Length"]} bytes)
                          </Badge>
                        )}
                        {selectedPacket["Unusual Ports"] && (
                          <Badge className="bg-yellow-900 text-yellow-100">
                            Unusual Port ({selectedPacket["Destination Port"]})
                          </Badge>
                        )}
                        {selectedPacket["Protocol Mismatch"] && (
                          <Badge className="bg-orange-900 text-orange-100">Protocol Mismatch</Badge>
                        )}
                        {selectedPacket["FTP Detected"] && (
                          <Badge className="bg-red-950 text-red-100">FTP Traffic</Badge>
                        )}
                        {selectedPacket["Multiple Login Attempts"] && (
                          <Badge className="bg-purple-900 text-purple-100">Multiple Login Attempts</Badge>
                        )}
                        {!selectedPacket["Large Packets"] &&
                          !selectedPacket["Unusual Ports"] &&
                          !selectedPacket["Protocol Mismatch"] &&
                          !selectedPacket["FTP Detected"] &&
                          !selectedPacket["Multiple Login Attempts"] && (
                            <span className="text-green-400">No security concerns detected</span>
                          )}
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LivePacketLogs

