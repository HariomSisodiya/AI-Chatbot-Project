export default function ChatHeader() {
  return (
    <div className="d-flex align-items-center gap-3 p-4 border-bottom position-relative overflow-hidden" 
         style={{ 
           background: "linear-gradient(135deg, #dc3545 0%, #c82333 100%)",
           borderRadius: "0.5rem 0.5rem 0 0"
         }}>
      {/* Background decoration */}
      <div className="position-absolute top-0 end-0 opacity-10">
        <div className="rounded-circle bg-white" style={{ width: "120px", height: "120px", transform: "translate(30px, -30px)" }}></div>
      </div>
      <div className="position-absolute bottom-0 start-0 opacity-10">
        <div className="rounded-circle bg-white" style={{ width: "80px", height: "80px", transform: "translate(-20px, 20px)" }}></div>
      </div>
      
      {/* Main content */}
      <div className="position-relative">
        <div className="rounded-circle d-flex align-items-center justify-content-center shadow-lg" 
             style={{ 
               width: "56px", 
               height: "56px",
               background: "linear-gradient(135deg, #fff 0%, #f8f9fa 100%)",
               border: "3px solid rgba(255,255,255,0.3)"
             }}>
          <span className="fw-bold" style={{ color: "#dc3545", fontSize: "18px" }}>AI</span>
        </div>
      </div>
      
      <div className="position-relative">
        <h1 className="h4 mb-1 text-white fw-bold">RedAI</h1>
        <p className="small mb-0 text-white-50">Your Intelligent Assistant</p>
      </div>
    </div>
  );
}
