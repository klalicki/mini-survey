interface SurveyQuestion {
  type: string;
  text: string;
}

interface MCQuestion extends SurveyQuestion {
  options: Array<{ id: number; text: string }>;
}

type SurveyDataset = {
  title: string;
  description: string;
  questions: Array<SurveyQuestion>;
};

const sampleData: SurveyDataset = {
  title: "My Sample Survey",
};

const EditPage = () => {
  return (
    <div>
      <h1>Edit Survey</h1>
    </div>
  );
};
export default EditPage;
