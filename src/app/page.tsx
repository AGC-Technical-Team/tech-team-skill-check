import SkillCheckForm from '@/components/SkillCheckForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-pink-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <SkillCheckForm />
      </div>
    </div>
  );
}
