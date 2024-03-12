import { IoIosFlash } from "react-icons/io";
import RenderStep from "./RenderStep";
export default function AddCourse() {
  return (
    <div className="flex flex-row justify-between  gap-x-6">
      <div className="flex flex-col flex-1 ">
        <h1 className=" text-white text-3xl font-semibold">Add Course</h1>
        <div className=" flex-1 mt-10">
          <RenderStep />
        </div>
      </div>
      <div className="text-white max-w-[350px] ">
        <div className="flex flex-col border border-richblack-400 rounded p-4 gap-y-4 ">
          <div className=" flex flex-row items-center">
            {" "}
            <span>
              <IoIosFlash color="#ffa500" size={17} />
            </span>
            <p> Course Upload Tips</p>
          </div>
          <ul className="  text-xs space-y-2 list-disc">
            <li>Set the Course Price option or make it free.</li>
            <li> Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create & organize a course.</li>

            <li>
              Add Topics in the Course Builder section to create lessons,
              quizzes, and assignments.
            </li>
            <li>
              Information from the Additional Data section shows up on the
              course single page.
            </li>
            <li>Make Announcements to notify any important</li>
            <li>Notes to all enrolled students at once.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
