"use client"

import { Input } from "@/components/ui/input"
import { useState } from "react"

export function Search() {
  const [search, setSearch] = useState("")

  return (
    <div>
      <Input
        type="search"
        placeholder="Search..."
        className="md:w-[100px] lg:w-[300px]"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  )
}

