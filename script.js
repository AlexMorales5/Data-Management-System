// Function to search and display student data
async function searchStudent() {
  const studentNumber = document.getElementById("studentNumber").value;

  // Fetch the data from the local JSON file
  const response = await fetch("data.json");
  const data = await response.json();

  // Find the student by student number
  const student = data.find(student => student.Student_Number == studentNumber);

  // Display the student data if found
  const studentInfoDiv = document.getElementById("studentInfo");
  if (student) {
      studentInfoDiv.innerHTML = `
          <h2>Student Information</h2>
          <p><strong>Student Number:</strong> ${student.Student_Number}</p>
          <p><strong>Year of Graduation:</strong> ${student.Sched_YearOfGraduation}</p>
          <p><strong>Cumulative GPA:</strong> ${student.Cumulative_GPA}</p>
          <h3>Grades</h3>
          <ul>
              <li><strong>Grade 9:</strong> S1: ${student["S1 grade=9"]}, S2: ${student["S2 grade=9"]}</li>
              <li><strong>Grade 10:</strong> S1: ${student["S1 grade=10"]}, S2: ${student["S2 grade=10"]}</li>
              <li><strong>Grade 11:</strong> S1: ${student["S1 grade=11"]}, S2: ${student["S2 grade=11"]}</li>
              <li><strong>Grade 12:</strong> S1: ${student["S1 grade=12"]}, S2: ${student["S2 grade=12"]}</li>
          </ul>
      `;

      // Display the recommendation based on GPA
      const recommendation = getRecommendation(student.Cumulative_GPA);
      studentInfoDiv.innerHTML += `<p class="recommendation"><strong>Recommendation:</strong> ${recommendation}</p>`;
  } else {
      studentInfoDiv.innerHTML = "<p>Student not found.</p>";
  }
}

// Function to determine the recommendation based on GPA
function getRecommendation(gpa) {
  if (gpa < 3) {
      return "Take Regular Classes";
  } else if (gpa >= 3 && gpa <= 3.5) {
      return "Take Honors Classes";
  } else {
      return "Take AP/IB Classes";
  }
}
