import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Stats = () => {
  return (
    <div className='flex gap-8 items-center'>
      <div className='border border-heading flex flex-col justify-between rounded-xl h-28 p-5 min-w-[200px]'>
        <div className='flex justify-between gap-5 items-center text-sm text-heading'>
          <p>Total Earnings</p>
          <Select>
            <SelectTrigger className="w-[130px] text-paragraph">
              <SelectValue placeholder="January" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select month</SelectLabel>

                {
                  [
                    "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                  ].map((month) => (
                    <SelectItem key={month} value={month.toLowerCase()}>
                      {month}
                    </SelectItem>
                  ))
                }


              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <h3 className='text-3xl font-medium text-heading'>$2005.23</h3>
      </div>
      <div className='border border-heading flex flex-col justify-between rounded-xl h-28 p-5 min-w-[200px]'>
        <p className='text-sm text-heading'>Total Companies</p>
        <h3 className='text-3xl font-medium text-heading'>3434</h3>
      </div>
      <div className='border border-heading flex flex-col justify-between rounded-xl h-28 p-5 min-w-[200px]'>
        <p className='text-sm text-heading'>Total Gaurds</p>
        <h3 className='text-3xl font-medium text-heading'>3434</h3>
      </div>
    </div>
  )
}

export default Stats
