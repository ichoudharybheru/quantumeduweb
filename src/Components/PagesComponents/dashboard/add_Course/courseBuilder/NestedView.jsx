import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { IoIosArrowDropdown } from "react-icons/io";
import { setCourse } from "../../../../../redux/slices/coursesSlice";
import { IoMdAdd } from "react-icons/io";
import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/sectionAndSubSectionApi";
import SubSectionalModal from "./SubSectionalModal";
const NestedView = ({ handleForEditSection }) => {
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const [addSubSection, setAddSubSection] = useState(null);

  const [editSubsection, setEditSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);

  const dispatch = useDispatch();
  const handleDeletesection = async (sectionId) => {
    const res = await deleteSection({ sectionId, courseId: course._id, token });
    console.log(sectionId);
    if (res) {
      dispatch(setCourse(res));
    }
  };
  const handleDeleteSubSection = async (sectionId, subSectionId) => {
    const result = await deleteSubSection({ subSectionId, sectionId, token });

    if (result) {
      // update the structure of course
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }

    // const updatedCourse = course.courseContent.map((section) => {
    //   if (section._id === sectionId) {
    //     // Create a new object with the updated subSection array
    //     return {
    //       ...section,
    //       subSection: section.subSection.filter(
    //         (subsection) => subsection._id !== subSectionId
    //       ),
    //     };
    //   }

    //   //      return section; // Return the section as is for other sections
    // });
    // console.log(updatedCourse);
  };

  return (
    <div>
      <div className=" rounded bg-richblack-700 p-8 space-y-3">
        {course?.courseContent?.map((section) => (
          <details key={section._id} open>
            <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
              <div className="flex items-center gap-x-3">
                <RxDropdownMenu className="text-2xl text-richblack-50" />
                <p className="font-semibold text-richblack-50">
                  {section.sectionName}
                </p>
              </div>
              <div className=" flex flex-row gap-x-3 items-center">
                <button
                  onClick={() =>
                    handleForEditSection(section.sectionName, section._id)
                  }
                >
                  <MdEdit size={20} />
                </button>
                <button onClick={() => handleDeletesection(section._id)}>
                  <MdOutlineDelete size={20} />
                </button>
                <div className=" h-0.5 w-4 bg-richblack-50 rotate-90"></div>
                <div>
                  <IoIosArrowDropdown size={20} />
                </div>
              </div>
            </summary>
            <div className="mx-3">
              {section?.subSection?.length > 0 &&
                section?.subSection.map((subbSection) => (
                  <div
                    key={subbSection._id}
                    onClick={() => setViewSubSection(subbSection)}
                  >
                    <div className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
                      {" "}
                      <div className="flex items-center gap-x-3">
                        <RxDropdownMenu className="text-2xl text-richblack-50" />
                        <p className="font-semibold text-richblack-50">
                          {subbSection.title}
                        </p>
                      </div>
                      <div
                        className=" flex flex-row gap-x-3 items-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => {
                            setEditSubSection({
                              ...subbSection,
                              sectionId: section._id,
                            });
                            // setViewSubSection(null);
                          }}
                        >
                          <MdEdit size={20} />
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteSubSection(section._id, subbSection._id)
                          }
                        >
                          <MdOutlineDelete size={20} />
                        </button>
                      </div>
                    </div>
                    <div onClick={(e) => e.stopPropagation()}>
                      {viewSubSection &&
                        viewSubSection._id === subbSection._id && (
                          <SubSectionalModal
                            modalData={viewSubSection}
                            setModalData={setViewSubSection}
                            view={true}
                          />
                        )}

                      {editSubsection &&
                        editSubsection._id === subbSection._id && (
                          <SubSectionalModal
                            modalData={editSubsection}
                            setModalData={setEditSubSection}
                            edit={true}
                          />
                        )}
                    </div>
                  </div>
                ))}
              <div>
                <div>
                  {addSubSection && section._id === addSubSection && (
                    <SubSectionalModal
                      modalData={addSubSection}
                      setModalData={setAddSubSection}
                      add={true}
                    />
                  )}
                </div>

                <button
                  className="flex flex-row gap-2 text-l text-caribbeangreen-200 items-center"
                  onClick={() => setAddSubSection(section._id)}
                >
                  <IoMdAdd size={20} /> <p>Add Lecture</p>
                </button>
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
};

export default NestedView;
