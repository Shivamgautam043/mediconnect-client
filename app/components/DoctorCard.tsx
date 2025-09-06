import { Calendar, Video } from "lucide-react";
import { Doctor } from "~/utilities/types";

export function DoctorCard1({ doctor }: { doctor: Doctor }) {
    return (
        <div className="rounded-lg shadow-md w-full h-full p-4">
            <div className="grid grid-flow-col place-content-between place-items-center w-full">
                <div className="grid grid-flow-col place-content-start place-items-start gap-2">
                    <img src="https://www.shalby.org/wp-content/uploads/2023/01/Dr-K-L-Gupta.png" alt="" style={{ width: 40, height: 40 }} className="bg-[#ccf6e5] rounded-full" />
                    <div>
                        <div>{doctor.full_name}</div>
                        <div>{doctor.specialization}</div>
                    </div>
                </div>
                <div className="rounded-full p-2 bg-[#176448]">
                    <Video size={24} color="white" />
                </div>
            </div>
            <div className="w-full h-[1px] bg-gray-300 my-3"></div>

            <div className="w-full">
                <div className="grid grid-cols-2 place-content-between place-items-center w-full">
                    <div className="grid grid-flow-col place-content-start place-items-start gap-2">
                       <div className="bg-[#effaf6] rounded-full p-2">
                        <Calendar size={20} color="#176448"/>
                       </div>
                       <div>
                            {doctor.experience_years}
                        </div>
                    </div>
                    <div className="grid grid-flow-col place-content-start place-items-start gap-2">
                        <img src="https://www.shalby.org/wp-content/uploads/2023/01/Dr-K-L-Gupta.png" alt="" style={{ width: 40, height: 40 }} className="bg-[#ccf6e5] rounded-full" />
                        <div>
                           
                        </div>
                    </div>
                </div>



            </div>
        </div>
    )

}