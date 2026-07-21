function CurrencyToggle({ currency, onChange, className = "" }) {
  return (
    <div
      className={`inline-flex items-center rounded-full border border-beige bg-offwhite p-1 text-xs font-medium ${className}`}
    >
      {["BRL", "EUR"].map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`px-3 py-1 rounded-full transition-colors ${
            currency === option
              ? "bg-nude-dark text-cream"
              : "text-ink-soft hover:text-ink"
          }`}
        >
          {option === "BRL" ? "R$ Brasil" : "€ Portugal"}
        </button>
      ))}
    </div>
  );
}

export default CurrencyToggle;
