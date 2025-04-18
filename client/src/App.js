import React, { useState } from "react";
import NavigationBar from "./components/Navbar";
import { Container, Button, Card, Badge, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import profileImage from "./assets/profile.jpg";
import resumePDF from "./assets/Ritik_Resume.pdf";


function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Message sent successfully!", { autoClose: 5000 });
        setFormData({ name: "", email: "", message: "" }); // Reset form
      } else {
        toast.error(result.error || "Failed to send message", {
          autoClose: 5000,
        });
      }
    } catch (error) {
      toast.error("Something went wrong!", { autoClose: 5000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={darkMode ? "bg-dark text-light" : "bg-light text-dark"}
      style={{ scrollBehavior: "smooth", minHeight: "100vh" }}
    >
      <NavigationBar darkMode={darkMode} setDarkMode={setDarkMode} />
      <ToastContainer position="top-center" />

      {/* Home */}
      <section
        id="home"
        className="text-center pt-5"
        style={{ paddingTop: "100px" }}
      >
        <img
          src={profileImage}
          alt="Profile"
          className="rounded-circle mb-3"
          style={{ width: "180px", height: "180px", objectFit: "cover" }}
        />
        <h1>Welcome to My Portfolio</h1>
        <p>I am a Full Stack Developer</p>
        <Button href={resumePDF} download="Ritik_Resume.pdf" className="mt-2">
          Download Resume
        </Button>
        <div className="mt-3 d-flex justify-content-center gap-3">
  <Button
    variant="outline-primary"
    href="https://www.linkedin.com/in/your-linkedin-id"
    target="_blank"
  >
    LinkedIn
  </Button>
  <Button
  variant={darkMode ? "light" : "outline-dark"}
  href="https://github.com/RITIKRAJGUPTA"
  target="_blank"
>
  GitHub
</Button>
</div>
      </section>

      {/* Rest of your code remains the same */}
      {/* About */}
      <section id="about" className="pt-5">
        <Container>
          <h2>About Me</h2>
          <p>
            I'm Ritik, a passionate Software Engineer with experience in React,
            Node.js, and full-stack development. I've worked on projects like a
            gym website, and a job portal.
          </p>
        </Container>
      </section>

      {/* Projects */}
      <section id="projects" className="pt-5">
        <Container>
          <h2>Projects</h2>
          <div className="row">
            {[
              {
                title: "Job Portal",
                desc: "Browse and purchase books online.",
                repolink: "https://github.com/RITIKRAJGUPTA/job_portal_backend",
                link: "#",
              },
              {
                title: "Gym Website",
                desc: "Fitness plans and trainer profiles.",
                repolink:
                  "https://github.com/RITIKRAJGUPTA/GYM_WEBSTITE_WITH_EMAIL_FUNCTIONALITY",
                link: "https://subtle-fenglisu-e12d0e.netlify.app/",
              },
              {
                title: "JS-Projects",
                desc: "Developed a site you have options like Color changer, BMI generator, Digital clock.",
                repolink: "https://github.com/RITIKRAJGUPTA/JS-Projects",
                link: "https://jsbyritikk.netlify.app/",
              },
            ].map((proj, idx) => (
              <div className="col-md-4" key={idx}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>{proj.title}</Card.Title>
                    <Card.Text>{proj.desc}</Card.Text>
                    <div className="d-flex gap-2">
                      <Button
                        variant="outline-dark"
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        disabled={proj.title === "Job Portal"} // disable for Job Portal
                      >
                        View
                      </Button>

                      <Button
                        variant="outline-dark"
                        href={proj.repolink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Repo Link
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Skills */}
      <section id="skills" className="pt-5">
        <Container>
          <h2>Skills</h2>
          {[
            "React.js",
            "Node.js",
            "MongoDB",
            "SQL",
            "JavaScript",
            "Bootstrap",
          ].map((skill, idx) => (
            <Badge key={idx} bg="info" className="me-2 mb-2">
              {skill}
            </Badge>
          ))}
        </Container>
      </section>
      {/* Certifications */}
      <section id="certifications" className="pt-5">
        <Container>
          <h2>Certifications</h2>
          <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
            <li className="mb-2">
              <Badge bg="success" className="me-2">
                React.js
              </Badge>
              Springboard by Infosys
            </li>
            <li className="mb-2">
              <Badge bg="success" className="me-2">
                Node.js
              </Badge>
              Springboard by Infosys
            </li>
            <li className="mb-2">
              <Badge bg="secondary" className="me-2">
                Business Analytics
              </Badge>
              Advanced Business Analytics Specialization
            </li>
          </ul>
        </Container>
      </section>

      {/* Contact */}
      <section id="contact" className="pt-5 pb-5">
        <Container>
          <h2>Contact Me</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Your Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Your Message</Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? "Sending..." : "Send"}
            </Button>
          </Form>
        </Container>
      </section>
    </div>
  );
}

export default App;
