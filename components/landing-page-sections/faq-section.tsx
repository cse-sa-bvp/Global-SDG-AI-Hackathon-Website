import { FAQ } from "../faq";

const FAQDemo = () => {
  const categories = {
    "registration": "Registration",
    "event-format": "Event Format",
    "judging": "Judging",
    "general": "General"
  };

  const faqData = {
    "registration": [
      {
        question: "Who can participate in the hackathon?",
        answer: "The hackathon is open to undergraduate and postgraduate students from recognized colleges and universities. Check the eligibility section for detailed criteria."
      },
      {
        question: "What is the team size?",
        answer: "Teams can consist of 2–4 members. Solo participation is not allowed."
      },
      {
        question: "What is the registration fee?",
        answer: "The registration fee is ₹199 per team."
      },
      {
        question: "What are the registration dates?",
        answer: "Registration opens on 15 July 2026 and closes on 15 August 2026."
      },
      {
        question: "Can I edit my registration after submitting?",
        answer: "Yes, team details can be updated until the registration deadline by contacting the organizing committee."
      }
    ],
    "event-format": [
      {
        question: "What are the stages of the hackathon?",
        answer: "The event consists of Registration & Idea Submission, Shortlisting & Evaluation, 48-Hour Grand Hackathon, Awards & Recognition, Innovation Expo & Startup Showcase, and Final Pitch."
      },
      {
        question: "Is the hackathon online or offline?",
        answer: "The Grand Hackathon and Finale will be conducted on campus at Bharati Vidyapeeth College of Engineering."
      },
      {
        question: "Will accommodation be provided?",
        answer: "Details regarding accommodation and facilities will be shared with shortlisted teams."
      },
      {
        question: "Will mentors be available during the event?",
        answer: "Yes. Industry experts and faculty mentors will guide teams throughout the hackathon."
      },
      {
        question: "What should participants bring?",
        answer: "Participants should bring their laptops, chargers, college ID cards, and any required hardware for their project."
      }
    ],
    "judging": [
      {
        question: "How will projects be evaluated?",
        answer: "Projects will be judged based on Innovation, Technical Implementation, SDG Alignment, Feasibility, Impact, and Presentation."
      },
      {
        question: "Can we use existing projects?",
        answer: "No. All submissions must be developed specifically for this hackathon."
      },
      {
        question: "Is the source code submission mandatory?",
        answer: "Yes. Teams must submit their source code and project documentation before the final evaluation."
      },
      {
        question: "Can we use AI tools during development?",
        answer: "Yes. AI tools are allowed as long as teams understand and can explain their implementation."
      },
      {
        question: "What happens if a team misses the submission deadline?",
        answer: "Late submissions may not be considered for evaluation."
      }
    ],
    "general": [
      {
        question: "What prizes will be awarded?",
        answer: "Winners will receive cash prizes, certificates, trophies, and exciting opportunities from sponsors and partners."
      },
      {
        question: "Will all participants receive certificates?",
        answer: "Yes. Every registered participant who completes the hackathon will receive a participation certificate."
      },
      {
        question: "Who owns the intellectual property of the project?",
        answer: "Teams retain ownership of their projects unless stated otherwise in the official rules."
      },
      {
        question: "How can I contact the organizing committee?",
        answer: "You can reach us through the Contact page or the official email and phone numbers listed there."
      },
      {
        question: "Where can I find the rulebook?",
        answer: "The complete rulebook can be downloaded from the Resources section or during registration."
      }
    ]
  };

  return (
    <div id="faqs" className="min-h-screen">
      <FAQ 
        title="Got Questions?"
        subtitle="Frequently Asked Questions"
        categories={categories}
        faqData={faqData}
      />
    </div>
  );
};

export default FAQDemo;