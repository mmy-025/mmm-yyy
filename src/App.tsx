import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Learn from "./pages/Learn";
import Practice from "./pages/Practice";
import Assessment from "./pages/Assessment";
import Achievements from "./pages/Achievements";
import Profile from "./pages/Profile";
import ThinkingModel from "./pages/ThinkingModel";
import Controversy from "./pages/Controversy";
import Quiz from "./pages/Quiz";
import KnowledgeList from "./pages/KnowledgeList";
import KnowledgeDetail from "./pages/KnowledgeDetail";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/knowledge" element={<KnowledgeList />} />
            <Route path="/knowledge/:id" element={<KnowledgeDetail />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/learn/:courseId/:chapterId" element={<Learn />} />
            <Route path="/practice/:courseId/:chapterId" element={<Practice />} />
            <Route path="/assessment/:courseId" element={<Assessment />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/thinking-model" element={<ThinkingModel />} />
            <Route path="/controversy" element={<Controversy />} />
            <Route path="/quiz" element={<Quiz />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
