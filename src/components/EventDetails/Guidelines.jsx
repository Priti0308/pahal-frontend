function Guidelines({ guidelines }) {
    const rules = [
        "Teams must consist of 2-4 members from the same college",
        "All team members must be currently enrolled students",
        "Projects must be original and developed during the competition",
        "Use of open-source libraries and frameworks is allowed",
        "Teams must present their solutions in English"
      ];
    
      return (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Guidelines</h3>
          <ul className="list-disc list-inside space-y-2">
            {rules.map((rule, index) => (
              <li key={index} className="text-gray-700">{rule}</li>
            ))}
          </ul>
        </div>
      );
    };
export default Guidelines;