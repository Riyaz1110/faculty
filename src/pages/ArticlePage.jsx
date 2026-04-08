import { useParams, Link } from "react-router-dom";

const articles = {
  "1": {
    title: "How to Ace Your Academic Interview in 5 Steps",
    author: "CampusHire Team",
    date: "April 1, 2026",
    readTime: "4 min read",
    imgUrl: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=1200&h=600&fit=crop",
    content: `
An academic interview is significantly different from a corporate interview. It requires you to not only demonstrate your technical expertise but also your teaching philosophy. Here are five essential steps to ensure you leave a lasting impression:

### 1. Research the Institution Thoroughly
Don't just browse their homepage. Dive into their recent publications, understand the departmental strengths, and familiarize yourself with the curriculum. You need to articulate exactly how you fit into their specific ecosystem, not just why you're a good teacher in general.

### 2. Prepare a Teaching Demonstration
Almost every academic interview will require you to teach a mock class. Treat this as the most important part of your interview. Engage the "students" (your interviewers), ask questions, and don't just lecture. Show them how you stimulate critical thinking.

### 3. Have a Clear Research Agenda
Even for teaching-heavy roles, institutions want to see intellectual curiosity. Be prepared to discuss your current research interests, how you plan to secure funding, and how you will involve students in your research.

### 4. Anticipate Behavioral Questions 
You will be asked about conflict resolution, how you handle underperforming students, or how you deal with academic dishonesty. Use the STAR method (Situation, Task, Action, Result) to provide structured, compelling answers.

### 5. Ask Insightful Questions
At the end of the interview, the panel will ask if you have questions. Never say no. Ask about the tenure track process, departmental goals, or support for junior faculty. This shows you are serious about a long-term commitment.
    `
  },
  "2": {
    title: "Building a Strong Research Portfolio",
    author: "Dr. Smith",
    date: "March 25, 2026",
    readTime: "6 min read",
    imgUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=600&fit=crop",
    content: `
A robust research portfolio is the cornerstone of academic advancement. Whether you are aiming for tenure or transitioning to a more research-intensive institution, your portfolio is your currency. 

### Quality Over Quantity
It's tempting to publish frequently in lower-tier journals just to inflate your CV. Resist this urge. Selection committees are increasingly sophisticated and prioritize high-impact publications over a long list of obscure papers.

### Collaborative Networking
Modern research is rarely a solitary endeavor. Actively seek out collaborations, both within your institution and externally. Co-authored papers, especially with established researchers, can significantly boost your profile and open doors to broader grants.

### Securing Grants
Your portfolio isn't just about what you've published; it's about what you've been funded to do. Outline a clear roadmap of the grants you intend to pursue. Start with smaller, internal or local grants and use them as stepping stones for larger national funding.

### Dissemination Beyond Journals
In today's digital age, impact is also measured by how widely your research is disseminated. Consider presenting at major conferences, writing op-eds related to your findings, or even maintaining a professional academic blog.

Building a portfolio is a marathon, not a sprint. Consistency, strategic planning, and a commitment to rigorous methodology will naturally lead to a portfolio that stands out in any academic review.
    `
  },
  "3": {
    title: "Resume Tips for First-Time Teachers",
    author: "CampusHire Team",
    date: "March 18, 2026",
    readTime: "5 min read",
    imgUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=600&fit=crop",
    content: `
Transitioning from a student or a different career path into your first teaching role can be daunting. Your resume needs to bridge the gap between your potential and their requirements. 

### Highlight Transferable Skills
If you haven't taught formally, focus on experiences where you mentored, trained, or presented. Did you lead a workshop in your previous job? Did you tutor peers in college? These are crucial indicators of your ability to instruct and guide others.

### State Your Teaching Philosophy
Include a brief, one-or-two-sentence summary at the top of your resume outlining your teaching philosophy. Let them know immediately what values you bring to the classroom—whether it's fostering inclusivity, leveraging technology, or promoting hands-on learning.

### Emphasize Relevant Coursework & Certifications
If your direct teaching experience is thin, lean on your academic preparation. List specific courses you took that prepare you for the role. If you have completed any pedagogical training or certifications (like TEFL, B.Ed components, or specialized workshops), feature them prominently.

### Format for Readability
Principals and hiring committees read hundreds of resumes. Use clean, professional formatting. 
- Avoid overly stylized templates.
- Use clear headings.
- Utilize bullet points rather than dense paragraphs.
- Keep it to one or two pages maximum.

Remember, your resume is a document that proves you understand the needs of the institution and the students. Tailor it specifically to the school you are applying to for maximum impact.
    `
  }
};

export default function ArticlePage() {
  const { id } = useParams();
  const article = articles[id];

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Article Not Found</h2>
        <Link to="/" className="text-blue-600 hover:underline">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Banner */}
      <div className="w-full h-64 md:h-96 relative">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img src={article.imgUrl} alt={article.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 z-20 flex items-center justify-center pt-10">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <span className="bg-blue-600 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full mb-4 inline-block">Career Advice</span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-md">
              {article.title}
            </h1>
            <div className="flex items-center justify-center gap-4 mt-6 text-gray-200 text-sm font-medium">
              <span>By {article.author}</span>
              <span>&bull;</span>
              <span>{article.date}</span>
              <span>&bull;</span>
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-30">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12">
          
          <Link to="/" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 mb-8 transition-colors">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Home
          </Link>

          <div className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed">
            {article.content.split('\\n').map((paragraph, idx) => {
              // Simple markdown parser for headers and bold text
              if (paragraph.trim().startsWith('### ')) {
                return <h3 key={idx} className="text-2xl font-bold text-gray-900 mt-10 mb-4">{paragraph.replace('### ', '')}</h3>;
              }
              if (paragraph.trim().startsWith('- ')) {
                return (
                  <ul key={idx} className="list-disc pl-5 my-2">
                    <li>{paragraph.replace('- ', '')}</li>
                  </ul>
                );
              }
              if (paragraph.trim() !== "") {
                return <p key={idx} className="mb-5">{paragraph}</p>;
              }
              return null;
            })}
          </div>
          
          {/* Footer Share Action */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Share this article</h4>
            <div className="flex gap-3">
              <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></button>
              <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
