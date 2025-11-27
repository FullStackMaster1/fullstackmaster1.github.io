import ReviewCard from "../ReviewCard";

export default function ReviewCardExample() {
  return (
    <div className="max-w-sm">
      <ReviewCard
        name="Bijan"
        date="Sep 25, 2025"
        rating={5}
        text="A fantastic call. I learned a huge amount of practical and valuable information. I now have a clear, structured plan towards my interviews."
        session="TPM Interview Prep"
      />
    </div>
  );
}
