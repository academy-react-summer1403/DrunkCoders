export const Step = ({ currentStep, stepNumber, icon: Icon, label }) => {
  const isActive = currentStep === stepNumber;
  const isCompleted = currentStep > stepNumber;

  return (
    <div className={`flex gap-2 items-center ${isActive ? 'text-black font-[500] text-lg' : ''}`}>
      <div
        className={`p-3 rounded-full ${
          isActive ? 'bg-primary-blue text-white' :
          isCompleted ? 'bg-primary-blue text-white' : 
          'bg-white text-black'
        }`}
      >
        <Icon className="stroke-current" />
      </div>
      <p>{label}</p>
    </div>
  );
};
