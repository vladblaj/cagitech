import { WorkflowDemo } from '../WorkflowDemo';
import { useLanguage } from '../../contexts/LanguageContext';
import { getWorkflowsData } from '../../data/workflowsData';

export function WorkflowsSection() {
  const { t } = useLanguage();
  const workflows = getWorkflowsData(t);

  return (
    <section className="hidden lg:block max-w-6xl mx-auto px-6 py-20">
      <header className="mb-16">
        <h2 className="text-3xl font-bold mb-4 text-timberwolf">
          {t("workflows")}
        </h2>
        <p className="text-lg text-timberwolf font-mono">
          {t("workflowDescription")}
        </p>
      </header>

      <div className="space-y-16">
        {workflows.map((workflow) => (
          <WorkflowDemo key={workflow.id} workflow={workflow} />
        ))}
      </div>
    </section>
  );
}