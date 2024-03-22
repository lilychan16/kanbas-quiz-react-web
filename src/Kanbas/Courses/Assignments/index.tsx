import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./index.css";
import { FaCheckCircle, FaEllipsisV, FaPlusCircle, FaPlus, FaClipboard } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import db from "../../Database";
import {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  setAssignment,
} from "./assignmentsReducer";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../store";

function Assignments() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //const assignmentList = db.assignments.filter(
    //(assignment) => assignment.course === courseId);

    const assignmentList = useSelector(
      (state: KanbasState) => state.assignmentsReducer.assignments
    ).filter((assignment) => assignment.course === courseId);

    const newAssignmentPage = () => {
      navigate(`/Kanbas/Courses/${courseId}/Assignments/New`);
      console.log("Navigate to new assignment page");
    };

    const [dialogShow, setDialogShow] = useState(false);
    const handleDialogClose = () => setDialogShow(false);

    return (
      <div className="ms-3 col-lg-10">
        <div className="d-flex justify-content-between">
          <div className="me-2">
            <input
              type="text"
              className="form-control ms-1"
              placeholder="Search for Assignment"
              id="search-assignment"
            />
          </div>
          <div className="float-end">
            <button className="btn btn-secondary me-1 button-color">
              <FaPlus /> Group
            </button>
            <button className="btn btn-danger me-1" onClick={newAssignmentPage}>
              <FaPlus /> Assignment
            </button>
            <button className="btn btn-secondary me-1 button-color button-size">
              <FaEllipsisV />
            </button>
          </div>
        </div>
        <hr />
        <ul className="list-group wd-modules">
          <li className="list-group-item">
            <div>
              <FaEllipsisV className="me-2" /> ASSIGNMENTS
              <span className="float-end">
                <button className="circle">40% of Total</button>
                <FaCheckCircle className="text-success" />
                <FaPlusCircle className="ms-2" />
                <FaEllipsisV className="ms-2" />
              </span>
            </div>
            <ul className="list-group">
              {assignmentList.map((assignment) => (
                <li className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <div>
                      <FaEllipsisV className="me-2" />
                      <FaClipboard
                        className="me-4"
                        style={{ color: "green" }}
                      />
                      <Link
                        to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}
                        className="assignment-setup"
                        onClick={() => dispatch(setAssignment(assignment))}
                      >
                        <b>{assignment.title}</b> <br />
                        <p className="due-info">
                          Week starting on {assignment.start} | <b>Due</b>{" "}
                          {assignment.due} at 11:59pm | {assignment.points}pts
                        </p>
                      </Link>
                    </div>
                    <div className="float-end">
                      <button
                        className="btn btn-danger"
                        style={{ height: "30px", fontSize: "14px" }}
                        onClick={() => {dispatch(setAssignment({...assignment, _id: assignment._id})); console.log(assignment); setDialogShow(true)}}
                      >
                        Delete
                      </button>
                      <FaCheckCircle className="ms-2 text-success" />
                      <FaEllipsisV className="ms-2" />
                    </div>
                    <Modal show={dialogShow} onHide={handleDialogClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Delete Assignment?</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        Do you want to delete this assignment?
                      </Modal.Body>
                      <Modal.Footer>
                        <button
                          className="btn btn-danger"
                          onClick={() => {console.log(assignment._id); dispatch(deleteAssignment(assignment._id)); handleDialogClose();}}
                        >
                          Yes
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={handleDialogClose}
                        >
                          No
                        </button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    );
}

export default Assignments;