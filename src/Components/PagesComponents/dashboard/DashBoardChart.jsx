import React, { useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  registerables,
} from "chart.js";
import { Doughnut, Bar, Line } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, ...registerables);
const DashBoardChart = ({ instructorData }) => {
  const [chartData, setChartData] = useState(null);
  const [graphType, setGraphType] = useState(null);
  const generateRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`;
      colors.push(color);
    }
    return colors;
  };

  const chartDataStudents = {
    labels: instructorData.map((course) => course.courseName),
    datasets: [
      {
        label: "Student",
        data: instructorData.map((course) => course.totalStudentsEnrolled),
        backgroundColor: generateRandomColors(instructorData.length),
      },
    ],
    stack: "Stack 0",
  };
  const chartDataRating = {
    labels: instructorData.map((course) => course.courseName),
    datasets: [
      {
        label: "Rating",
        data: instructorData.map((course) => course.totalrating),
        backgroundColor: generateRandomColors(instructorData.length),
      },
    ],
    stack: "Stack 0",
  };
  const chartDataIncome = {
    labels: instructorData.map((course) => course.courseName),
    datasets: [
      {
        label: "Income",
        data: instructorData.map((course) => course.totalAmountGenerated),
        backgroundColor: generateRandomColors(instructorData.length),
      },
    ],
    stack: "Stack 0",
  };

  const chartIncomeStudents = {
    labels: instructorData.map((course) => course.courseName),
    datasets: [
      {
        label: "Income",
        data: instructorData.map((course) => Math.floor(Math.random() * 256)),
        backgroundColor: generateRandomColors(instructorData.length),
        borderColor: generateRandomColors(instructorData.length),
      },
      {
        label: "student",
        data: instructorData.map((course) => Math.floor(Math.random() * 256)),
        backgroundColor: generateRandomColors(instructorData.length),
        borderColor: generateRandomColors(instructorData.length),
      },
    ],
    stack: "Stack 0",
  };
  return (
    <div>
      <div className=" flex lg:flex-row gap-x-2 ">
        <p className=" text-yellow-200">Graph type :</p>
        <button
          className={` ${
            graphType === null ? " text-brown-100" : " text-richblack-400"
          }`}
          onClick={() => setGraphType(null)}
        >
          All
        </button>
        <button
          className={` ${
            graphType === "Doughnut" ? " text-brown-100" : " text-richblack-400"
          }`}
          onClick={() => setGraphType("Doughnut")}
        >
          Doughnut
        </button>{" "}
        <button
          className={` ${
            graphType === "Bar" ? " text-brown-100" : " text-richblack-400"
          }`}
          onClick={() => setGraphType("Bar")}
        >
          Bar
        </button>
        <button
          className={` ${
            graphType === "Line" ? " text-brown-100" : " text-richblack-400"
          }`}
          onClick={() => setGraphType("Line")}
        >
          Line
        </button>
      </div>
      <div className=" flex lg:flex-row gap-x-2 pl-3">
        <button
          className={` ${
            chartData === null ? " text-brown-100" : " text-richblack-400"
          }`}
          onClick={() => setChartData(null)}
        >
          All
        </button>
        <button
          className={` ${
            chartData === "students" ? " text-brown-100" : " text-richblack-400"
          }`}
          onClick={() => setChartData("students")}
        >
          students
        </button>{" "}
        <button
          className={` ${
            chartData === "income" ? " text-brown-100" : " text-richblack-400"
          }`}
          onClick={() => setChartData("income")}
        >
          income
        </button>
        <button
          className={` ${
            chartData === "rating" ? " text-brown-100" : " text-richblack-400"
          }`}
          onClick={() => setChartData("rating")}
        >
          rating
        </button>
      </div>
      {graphType === "Line" ? (
        <Line
          data={
            chartData === "students"
              ? chartDataStudents
              : chartData === "income"
              ? chartDataIncome
              : chartData === "rating"
              ? chartDataRating
              : chartIncomeStudents
          }
        ></Line>
      ) : graphType === "Bar" ? (
        <Bar
          data={
            chartData === "students"
              ? chartDataStudents
              : chartData === "income"
              ? chartDataIncome
              : chartData === "rating"
              ? chartDataRating
              : chartIncomeStudents
          }
        />
      ) : graphType === "Doughnut" ? (
        <Doughnut
          data={
            chartData === "students"
              ? chartDataStudents
              : chartData === "income"
              ? chartDataIncome
              : chartData === "rating"
              ? chartDataRating
              : chartIncomeStudents
          }
        ></Doughnut>
      ) : (
        <>
          <Line
            data={
              chartData === "students"
                ? chartDataStudents
                : chartData === "income"
                ? chartDataIncome
                : chartData === "rating"
                ? chartDataRating
                : chartIncomeStudents
            }
          ></Line>
          <Bar
            data={
              chartData === "students"
                ? chartDataStudents
                : chartData === "income"
                ? chartDataIncome
                : chartData === "rating"
                ? chartDataRating
                : chartIncomeStudents
            }
          />

          <Doughnut
            data={
              chartData === "students"
                ? chartDataStudents
                : chartData === "income"
                ? chartDataIncome
                : chartData === "rating"
                ? chartDataRating
                : chartIncomeStudents
            }
          ></Doughnut>
        </>
      )}
    </div>
  );
};

export default DashBoardChart;
