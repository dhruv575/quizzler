import React, { useState } from "react";
import "./Upload.css";
import Download from "./Download";
import { extractTextFromFile } from "../utils/textUtils";
import ReCAPTCHA from "react-google-recaptcha";

const Upload = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    studyTopic: "",
    file: null,
  });

  const [showDownload, setShowDownload] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e, action) => {
    e.preventDefault();
    if (!captchaVerified) {
      alert("Please verify the captcha");
      return;
    }

    if (
      action === "generate" &&
      formData.email &&
      formData.password &&
      formData.studyTopic &&
      formData.file
    ) {
      if (formData.file.size > 80 * 1024) {
        alert("File size should be less than 80kb");
        return;
      }

      console.log("Starting Text Processing");
      const text = await extractTextFromFile(formData.file);
      console.log("Extracted Text:", text);

      console.log("Generate Form Data:", formData);
      setFormData({
        email: "",
        password: "",
        studyTopic: "",
        file: null,
      });
      e.target.reset();
      setShowDownload(true);
    } else if (
      action === "search" &&
      formData.email &&
      formData.password &&
      formData.studyTopic
    ) {
      console.log("Search Form Data:", formData);
    }
  };

  const handleCaptchaChange = (value) => {
    setCaptchaVerified(!!value);
  };

  const handleGenerateSubmit = (e) => handleSubmit(e, "generate");
  const handleSearchSubmit = (e) => handleSubmit(e, "search");

  return (
    <div className="upload-wrapper">
      <div className="upload-container">
        <div className="rectangle large-rectangle">
          <h2 className="title">Using Quizzler</h2>
          <p className="description">
            To use Quizzler, either search for a previously created deck using
            the email, password, and study topic, or upload a text file of your
            notes from whatever class, assignment, or test you would like to
            study for. While Quizzler will run given any notes, it will work
            best on well-structured notes. For the time being, we will limit
            text file uploads to 80kb.
          </p>
          <p className="description">
            Based on this content, we will generate a 20 question Kahoot csv, a
            40 flashcard quizlet, and a 60 word Skribbl.io deck. You will be
            able to download these right under as soon as you submit your
            document. We will also let you play Quizzerly (a free combination of
            MCQ, Match, and AI graded free response questions).
          </p>
        </div>
        <div className="rectangle small-rectangle">
          <form className="upload-form" onSubmit={handleGenerateSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="text-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="text-input"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="studyTopic"
              placeholder="Study Topic"
              className="text-input"
              value={formData.studyTopic}
              onChange={handleChange}
              required
            />
            <div className="file-input-container">
              <input
                type="file"
                name="file"
                accept=".txt"
                className="file-input"
                onChange={handleChange}
                required
              />
              <label htmlFor="file" className="file-input-label">
                Choose File
              </label>
              <span className="file-name">
                {formData.file ? formData.file.name : "No file chosen"}
              </span>
            </div>
            <div className="button-container">
              <button type="submit" className="submit-button">
                Generate
              </button>
              <button
                type="button"
                className="submit-button"
                onClick={handleSearchSubmit}
              >
                Search
              </button>
            </div>
            <div className="captcha-container">
              <ReCAPTCHA
                sitekey="6LfLOPApAAAAAOuoUEne8etJRNQXlVu9l5bX1N8E"
                onChange={handleCaptchaChange}
              />
            </div>
          </form>
        </div>
      </div>
      {showDownload && <Download />}
    </div>
  );
};

export default Upload;
