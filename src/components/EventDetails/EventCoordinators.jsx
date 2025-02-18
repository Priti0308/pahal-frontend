import logo from "../../assets/logo.png";

function EventCoordinators() {
    const coordinators = [
        {
          name: "Prof. Rajesh Kumar",
          contact: "+91 98765 43210",
          image: logo
        },
        {
          name: "Prof. Priya Sharma",
          contact: "+91 98765 43211",
          image: logo
        }
      ];
    
      return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Event Coordinators</h3>
          <div className="space-y-4">
            {coordinators.map((coordinator, index) => (
              <div key={index} className="flex items-center gap-3">
                <img 
                  src={coordinator.image} 
                  alt={coordinator.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-medium">{coordinator.name}</h4>
                  <p className="text-gray-600 text-sm">{coordinator.contact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    };
    export default EventCoordinators;