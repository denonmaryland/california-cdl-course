window.CDL_COURSE = {
  title: "California Class A CDL Course",
  version: "2026-05-20",
  target: "California Class A CLP/CDL",
  passingThreshold: 80,
  disclaimer: "This course improves preparation but cannot guarantee a DMV result. Always verify current requirements with California DMV.",
  sources: [
    {
      label: "Local handbook extraction",
      detail: "California Commercial Driver Handbook PDF supplied by the user, extracted into source/handbook-text.txt.",
      url: "./source/handbook-text.txt"
    },
    {
      label: "California DMV - Commercial Driver's Licenses",
      detail: "Used for current California CDL overview, sample test links, age/CMV overview, medical, HazMat, and handbook references.",
      url: "https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/commercial-driver-licenses-cdl/"
    },
    {
      label: "California DMV - Sample CDL Knowledge Tests",
      detail: "Used to align the practice area with the official sample-test style and topic emphasis.",
      url: "https://www.dmv.ca.gov/portal/driver-education-and-safety/educational-materials/sample-driver-license-dl-knowledge-tests/"
    },
    {
      label: "California DMV - Commercial Test 1",
      detail: "Used as a topic signal for inspection, night driving, offtracking, warning devices, fire, and stopping-distance concepts.",
      url: "https://www.dmv.ca.gov/portal/driver-education-and-safety/educational-materials/sample-driver-license-dl-knowledge-tests/sample-commercial-drivers-written-test-1/"
    },
    {
      label: "California DMV - Commercial Test 2",
      detail: "Used as a topic signal for downgrades, cargo checks, warning triangles, fog, GCW, seeing distance, clearance, brakes, and exhaust defects.",
      url: "https://www.dmv.ca.gov/portal/driver-education-and-safety/educational-materials/sample-driver-license-dl-knowledge-tests/sample-commercial-drivers-written-test-2/"
    },
    {
      label: "FMCSA - State CDL knowledge and skills standards",
      detail: "Used for the 80 percent passing threshold and minimum federal knowledge-test standards.",
      url: "https://www.fmcsa.dot.gov/registration/commercial-drivers-license/states"
    },
    {
      label: "FMCSA - National CDL Program Training",
      detail: "Used to confirm Class A knowledge-test mix and typical test counts for General Knowledge, Air Brakes, and Combination Vehicles.",
      url: "https://ai.fmcsa.dot.gov/downloadFile.axd?file=CDLTraining508Accessible.pdf"
    }
  ],
  modules: [
    {
      id: "roadmap",
      title: "Permit Roadmap and California Rules",
      exam: "general",
      source: "Handbook Section 1; DMV CDL overview",
      minutes: 32,
      objective: "Know what tests, documents, restrictions, and endorsements matter before you walk into DMV.",
      memory: "Permit first, restriction strategy always.",
      focus: "Class A requires General Knowledge plus Combination Vehicles. Air Brakes matters because most serious Class A jobs use air brakes.",
      caution: "The course emphasizes your current target: Class A with no avoidable automatic, air-brake, or non-fifth-wheel restriction.",
      lessons: [
        {
          id: "roadmap-cdl",
          title: "Who needs a CDL",
          summary: "California treats commercial operation as a vehicle, use, passenger, weight, and HazMat question. Do not memorize only one number.",
          mustKnow: [
            "CDL triggers include heavy single vehicles, heavy combinations, passenger transport, placarded HazMat, hazardous waste, multi-trailer towing, and some 3-axle vehicles.",
            "Class A is the broadest freight path because it covers legal combinations and includes Class B and C vehicle privileges when properly endorsed.",
            "California allows some intrastate commercial driving at 18, but interstate and HazMat are generally age 21 paths."
          ],
          memory: "Ask four questions: how heavy, what is towed, who or what is carried, and is it placarded?",
          drill: "Look at three job ads and label whether each sounds Class A, B, or C.",
          check: {
            question: "Which target best preserves the highest freight ceiling?",
            options: ["Class A with air brakes and combinations", "Class C only", "Passenger endorsement only", "A noncommercial Class C license"],
            answer: 0,
            explanation: "Class A is the broadest freight license path, especially when paired with air brakes and combination vehicle knowledge."
          }
        },
        {
          id: "roadmap-tests",
          title: "Knowledge and skills tests",
          summary: "The written side gets you the CLP. The skills side proves inspection, control, and road behavior in a representative vehicle.",
          mustKnow: [
            "Your core permit study stack is General Knowledge, Air Brakes, and Combination Vehicles.",
            "The skills test has three parts: vehicle inspection, basic control skills, and road test.",
            "You must take skills tests in the type of vehicle you want to be licensed for."
          ],
          memory: "Written unlocks the permit; skills unlock the license.",
          drill: "Say the three skills-test parts out loud without looking.",
          check: {
            question: "Which set matches the CDL skills test structure?",
            options: ["Vehicle inspection, basic control, road test", "Vision, parking, written rules", "HazMat, tanker, doubles", "Medical exam, fingerprinting, insurance"],
            answer: 0,
            explanation: "The skills test is inspection, basic control, and road test."
          }
        },
        {
          id: "roadmap-restrictions",
          title: "Restriction avoidance",
          summary: "Some choices at testing time follow you onto the license. The school and test vehicle matter.",
          mustKnow: [
            "Testing without air brakes can create an air-brake restriction.",
            "Testing in an automatic can create an automatic transmission restriction.",
            "Testing a Class A combination that is not the right tractor-trailer/fifth-wheel setup can narrow future tractor-trailer options."
          ],
          memory: "The test vehicle writes part of your license.",
          drill: "Before calling a school, write the three equipment questions you need answered.",
          check: {
            question: "Why does the test vehicle matter?",
            options: ["It can create license restrictions", "It changes the DMV passing score", "It removes the medical requirement", "It replaces the written tests"],
            answer: 0,
            explanation: "Air brake, automatic, and combination-equipment choices can create restrictions."
          }
        }
      ]
    },
    {
      id: "inspection",
      title: "Vehicle Inspection System",
      exam: "general",
      source: "Handbook Sections 2.1 and 11",
      minutes: 48,
      objective: "Build an inspection habit that works for written questions and the vehicle inspection test.",
      memory: "Inspect before, during, and after. Defects become your responsibility once you drive.",
      focus: "Official sample questions heavily emphasize pre-trip thinking, steering play, lights, brakes, tires, emergency equipment, and unsafe defects.",
      caution: "For the skills test, you must explain what you inspect and why. Silent looking is not enough.",
      lessons: [
        {
          id: "inspection-why",
          title: "Why and when to inspect",
          summary: "Inspection is safety, legal compliance, and self-protection. Problems found before departure are cheaper than failures on the road.",
          mustKnow: [
            "Inspect before operating, during trips, and after trips.",
            "Review the previous driver vehicle inspection report when one applies.",
            "Unsafe defects must be repaired before operation."
          ],
          memory: "Before, during, after: the inspection loop.",
          drill: "Name five defects that would make you stop before driving.",
          check: {
            question: "When should a pre-trip inspection be completed?",
            options: ["Before operating the vehicle", "Only once a week", "Only when a mechanic asks", "Only after a breakdown"],
            answer: 0,
            explanation: "A pre-trip inspection belongs before operation."
          }
        },
        {
          id: "inspection-seven-step",
          title: "Seven-step method",
          summary: "The handbook organizes inspection into a repeatable flow so you do not miss systems under stress.",
          mustKnow: [
            "Start with vehicle overview, engine compartment, engine start and gauges, lights, walk-around, signal lights, then brake checks.",
            "Air brake vehicles replace the hydraulic check with specific air brake tests.",
            "Emergency equipment includes warning devices and a properly charged fire extinguisher."
          ],
          memory: "Overview, engine, gauges, lights, walk, signals, brakes.",
          drill: "Walk around your current vehicle and practice saying the sequence out loud.",
          check: {
            question: "Which item belongs in required emergency equipment checks?",
            options: ["Properly charged fire extinguisher", "Bluetooth speaker", "Extra sunglasses", "Personal laptop"],
            answer: 0,
            explanation: "Warning devices and a proper fire extinguisher are core emergency equipment."
          }
        },
        {
          id: "inspection-defects",
          title: "High-yield defects",
          summary: "DMV style questions often ask which defect is unsafe enough to fix before driving.",
          mustKnow: [
            "Steering wheel play over about 10 degrees can indicate an unsafe steering problem.",
            "Brake linings should not be oil-soaked or dangerously thin.",
            "Exhaust leaks can allow toxic gases into the cab or sleeper."
          ],
          memory: "Steer, stop, seal: steering, brakes, exhaust.",
          drill: "Make a two-column list: cosmetic issue versus stop-before-driving defect.",
          check: {
            question: "Which defect should be fixed before driving?",
            options: ["Excessive steering wheel play", "A clean windshield", "A full fuel tank", "A properly latched hood"],
            answer: 0,
            explanation: "Excessive steering play can mean poor control and must be corrected."
          }
        }
      ]
    },
    {
      id: "control",
      title: "Basic Control, Shifting, Seeing, Communicating",
      exam: "general",
      source: "Handbook Sections 2.2 through 2.5",
      minutes: 42,
      objective: "Control the vehicle smoothly and communicate early enough that others can react.",
      memory: "Smooth inputs buy time. Visibility gives you choices.",
      focus: "This module feeds both written questions and later road-test habits.",
      caution: "Do not treat backing as normal driving in reverse. It is a risk event that requires setup.",
      lessons: [
        {
          id: "control-smooth",
          title: "Acceleration, steering, stopping",
          summary: "Commercial vehicles punish rough control. Smooth control protects traction, passengers, cargo, and coupling gear.",
          mustKnow: [
            "Accelerate gradually, especially with poor traction or when pulling a trailer.",
            "Steer without sudden movements.",
            "Brake early and smoothly; heavy vehicles need more stopping distance."
          ],
          memory: "Nothing sudden in a heavy vehicle.",
          drill: "Explain why rough acceleration can be worse with a trailer attached.",
          check: {
            question: "When traction is poor, how should you accelerate?",
            options: ["Very gradually", "As hard as possible", "Only after applying the trailer hand valve", "With the parking brake partly set"],
            answer: 0,
            explanation: "Gradual acceleration helps prevent wheel spin and loss of control."
          }
        },
        {
          id: "control-backing",
          title: "Backing safely",
          summary: "Backing should be rare, planned, and slow. Get out and look when unsure.",
          mustKnow: [
            "Avoid backing whenever possible.",
            "Back toward the driver side when you can.",
            "Use mirrors, back slowly, and pull forward to correct position."
          ],
          memory: "Goal: avoid backing. If backing, GOAL: get out and look.",
          drill: "Draw a driver-side backing path and mark where you would stop to re-check.",
          check: {
            question: "When backing a trailer, which side is usually preferred when you have a choice?",
            options: ["Driver side", "Blind side", "Whichever is faster", "Neither side matters"],
            answer: 0,
            explanation: "Driver-side backing gives better visibility."
          }
        },
        {
          id: "control-seeing",
          title: "Seeing and communicating",
          summary: "Look far enough ahead to identify changes, and signal early enough to make your intentions clear.",
          mustKnow: [
            "Look at least 12 to 15 seconds ahead.",
            "Check mirrors regularly and before lane changes, turns, merges, and tight maneuvers.",
            "Signal early, then cancel signals after the maneuver."
          ],
          memory: "Scan ahead, mirror, signal, move.",
          drill: "While riding or driving today, practice naming what is 12 to 15 seconds ahead.",
          check: {
            question: "A CDL driver should normally look how far ahead?",
            options: ["12 to 15 seconds", "1 to 2 seconds", "Only to the hood", "Only at the vehicle directly ahead"],
            answer: 0,
            explanation: "The handbook uses a 12 to 15 second visual lead."
          }
        }
      ]
    },
    {
      id: "speed-space-hazards",
      title: "Speed, Space, Hazards, Conditions",
      exam: "general",
      source: "Handbook Sections 2.6 through 2.23",
      minutes: 58,
      objective: "Manage stopping distance, following distance, road conditions, and emergencies.",
      memory: "Distance is your main safety tool.",
      focus: "Official sample topics include stopping distance, downgrades, fog, headlights, warning devices, fires, and night driving.",
      caution: "A posted speed is not always a safe speed for a heavy vehicle.",
      lessons: [
        {
          id: "speed-stopping",
          title: "Stopping distance and following distance",
          summary: "Stopping distance has several parts, and following distance must grow with length, speed, weather, and load.",
          mustKnow: [
            "Total stopping distance includes perception, reaction, and braking distance.",
            "For following distance, use at least 1 second per 10 feet of vehicle length at lower speeds.",
            "Add more distance above 40 mph, in bad weather, with heavy traffic, or with poor visibility."
          ],
          memory: "See it, react, brake. Leave room for all three.",
          drill: "For a 60-foot rig above 40 mph, calculate a conservative following-distance target.",
          check: {
            question: "Which parts make up total stopping distance?",
            options: ["Perception, reaction, braking", "Steering, mirrors, tires", "Cargo, fuel, oil", "Signal, merge, park"],
            answer: 0,
            explanation: "The core stopping-distance chain is perception, reaction, and braking."
          }
        },
        {
          id: "speed-downgrades",
          title: "Curves, downgrades, and mountains",
          summary: "Heavy vehicles can overheat brakes and roll over when speed is managed too late.",
          mustKnow: [
            "Slow before curves and ramps.",
            "Choose the proper gear before starting down a long grade.",
            "Use braking techniques that avoid brake fade and maintain control."
          ],
          memory: "Gear before grade, slow before curve.",
          drill: "Explain why downshifting after entering a steep downgrade is too late.",
          check: {
            question: "Before a long steep downgrade, what should you do?",
            options: ["Select a proper lower gear before descending", "Wait until halfway down to downshift", "Use only the parking brake", "Turn off low beams"],
            answer: 0,
            explanation: "Gear selection belongs before the descent begins."
          }
        },
        {
          id: "speed-conditions",
          title: "Night, fog, weather, and hazards",
          summary: "Reduced visibility and traction change the safe speed. The truck has to be able to stop inside what you can see.",
          mustKnow: [
            "At night, drive slow enough to stop within headlight range.",
            "In dense fog, the safest choice may be to park in a safe place until conditions improve.",
            "Use low beams in fog and avoid relying on high beams."
          ],
          memory: "If you cannot see it, you cannot safely stop for it.",
          drill: "Create a one-sentence fog plan you could remember under pressure.",
          check: {
            question: "In heavy fog, what is usually safest when conditions are severe?",
            options: ["Park safely until visibility improves", "Use high beams and speed up", "Follow taillights closely", "Drive on the shoulder"],
            answer: 0,
            explanation: "The handbook favors getting off the road safely when fog becomes too dangerous."
          }
        },
        {
          id: "speed-emergencies",
          title: "Emergencies, ABS, skids, fires",
          summary: "The written test rewards knowing the first safe action, not just the final outcome.",
          mustKnow: [
            "ABS helps maintain steering control during hard braking, but it does not make stopping distance disappear.",
            "For a trailer skid, release the brakes to regain traction.",
            "Water should not be used on electrical or gasoline fires."
          ],
          memory: "Control first, then solve.",
          drill: "Talk through the first three actions after a tire failure.",
          check: {
            question: "Water can safely be used on which fire?",
            options: ["Neither electrical nor gasoline fires", "Electrical fires", "Gasoline fires", "Any fire on a vehicle"],
            answer: 0,
            explanation: "Water can worsen electrical and gasoline fires."
          }
        }
      ]
    },
    {
      id: "cargo",
      title: "Cargo and Securement",
      exam: "cargo",
      source: "Handbook Section 3",
      minutes: 34,
      objective: "Understand how weight, balance, and securement affect safety and test questions.",
      memory: "Weight low, centered, legal, and secured.",
      focus: "Cargo appears in General Knowledge and Class A practice tests because securement and weight distribution change handling.",
      caution: "Sealed loads still require paperwork and external safety checks; sealed does not mean responsibility disappears.",
      lessons: [
        {
          id: "cargo-inspect",
          title: "Inspecting cargo",
          summary: "You are responsible for knowing cargo is secure enough to operate safely within legal weight limits.",
          mustKnow: [
            "Inspect cargo and securing devices before and during the trip.",
            "Know gross weight, axle weight, and gross combination weight concepts.",
            "Make sure cargo does not block emergency equipment or exits."
          ],
          memory: "Secure before speed.",
          drill: "Write the three cargo weights you should be able to explain.",
          check: {
            question: "Gross Combination Weight is best understood as what?",
            options: ["Powered unit plus trailer plus load", "Trailer only", "Cargo only", "Fuel plus driver only"],
            answer: 0,
            explanation: "GCW is the total weight of the power unit, trailer, and cargo."
          }
        },
        {
          id: "cargo-balance",
          title: "Weight and balance",
          summary: "High, off-center, or overloaded cargo can make steering, braking, and rollover risk worse.",
          mustKnow: [
            "Keep cargo as low as possible.",
            "Balance cargo side-to-side and front-to-back.",
            "Do not exceed legal weight limits."
          ],
          memory: "Low and centered keeps the rig honest.",
          drill: "Explain why a top-heavy load changes curve speed.",
          check: {
            question: "What happens when cargo is piled high?",
            options: ["Rollover risk increases", "Rollover risk disappears", "Braking distance always decreases", "Offtracking stops"],
            answer: 0,
            explanation: "A higher center of gravity makes rollovers more likely."
          }
        },
        {
          id: "cargo-secure",
          title: "Securement basics",
          summary: "Cargo must be blocked, braced, tied down, covered when needed, and rechecked.",
          mustKnow: [
            "Blocking and bracing prevent cargo movement.",
            "Tie-downs must be strong enough and properly placed.",
            "Special loads such as dry bulk, livestock, oversized loads, and projecting loads have added concerns."
          ],
          memory: "If it can move, it can change the truck.",
          drill: "Point to three places cargo could move during hard braking.",
          check: {
            question: "What is the purpose of blocking and bracing?",
            options: ["Prevent cargo movement", "Increase engine power", "Reduce legal paperwork", "Replace mirrors"],
            answer: 0,
            explanation: "Blocking and bracing keep cargo from shifting."
          }
        }
      ]
    },
    {
      id: "air-system",
      title: "Air Brake System",
      exam: "air-brakes",
      source: "Handbook Sections 5.1 and 5.2",
      minutes: 44,
      objective: "Understand what each air-brake component does before memorizing the tests.",
      memory: "Air stores energy. Springs stop the vehicle when air is lost.",
      focus: "Air Brakes is a separate knowledge test if you want to operate air-brake equipped CMVs.",
      caution: "Never fan or release brakes casually in real operation. Testing procedures belong in controlled inspection contexts.",
      lessons: [
        {
          id: "air-compressor",
          title: "Compressor, governor, tanks",
          summary: "The compressor supplies air, the governor controls cut-in/cut-out, and tanks store air for brake applications.",
          mustKnow: [
            "The governor controls when the compressor pumps air.",
            "Cut-out is commonly around 120 to 140 psi, and cut-in is commonly around 100 psi.",
            "Air tanks should be drained to remove water and oil."
          ],
          memory: "Governor decides; tanks supply.",
          drill: "Draw compressor to governor to tank in three boxes.",
          check: {
            question: "What does the air compressor governor control?",
            options: ["When the compressor pumps air", "Headlight brightness", "Fuel flow to injectors", "Mirror adjustment"],
            answer: 0,
            explanation: "The governor controls compressor cut-in and cut-out."
          }
        },
        {
          id: "air-warning",
          title: "Warnings, gauges, safety valve",
          summary: "The system tells you pressure status. Warnings are not suggestions; they are stop-and-fix signals.",
          mustKnow: [
            "Low-air warning must activate before pressure drops below 55 psi, unless manufacturer design is higher.",
            "Safety valves are commonly set to open near 150 psi.",
            "Pressure gauges show available air in primary and secondary systems."
          ],
          memory: "Below 55 means warning; 150 protects the tanks.",
          drill: "Make a two-number flashcard: 55 and 150.",
          check: {
            question: "When must a low-air warning activate?",
            options: ["Before pressure drops below 55 psi", "Only after pressure reaches zero", "At any speed above 55 mph", "Only when the engine is off"],
            answer: 0,
            explanation: "The warning must activate before the system drops below the required low-pressure threshold."
          }
        },
        {
          id: "air-spring",
          title: "Spring brakes and parking controls",
          summary: "Spring brakes apply when air pressure is low. That fail-safe design can also cause control problems if pressure is lost.",
          mustKnow: [
            "Spring brakes are held off by air pressure.",
            "If pressure drops too low, spring brakes come on.",
            "Do not push the brake pedal down when spring brakes are on; it can damage the system."
          ],
          memory: "Air releases spring brakes; low air lets them apply.",
          drill: "Explain why spring brakes are both safety backup and skid risk.",
          check: {
            question: "What makes spring brakes release during normal operation?",
            options: ["Air pressure", "Coolant temperature", "Oil pressure", "Headlight switch"],
            answer: 0,
            explanation: "Air pressure holds spring brakes off."
          }
        }
      ]
    },
    {
      id: "air-tests",
      title: "Air Brake Inspection Tests",
      exam: "air-brakes",
      source: "Handbook Section 5.3",
      minutes: 52,
      objective: "Memorize the air-brake test sequence and verbal thresholds for DMV inspection.",
      memory: "Leak, warn, pop, build.",
      focus: "The handbook calls several air-brake inspection items critical for skills testing.",
      caution: "Use the exact standards for your representative vehicle and examiner instructions.",
      lessons: [
        {
          id: "air-applied-leak",
          title: "Applied leakage test",
          summary: "With pressure at governor cut-out, the applied leakage test checks how much pressure drops while holding the foot brake.",
          mustKnow: [
            "Hold full foot-brake application for 1 minute after stabilization.",
            "Maximum applied loss is 3 psi for single vehicles, 4 psi for two-vehicle combinations, and 6 psi for three-or-more vehicle combinations.",
            "For certain Class A combinations without air-brake-equipped trailers, the lower single-vehicle limit applies."
          ],
          memory: "Applied leak: 3, 4, 6.",
          drill: "Say: single 3, combo 4, triples 6, then explain what test it belongs to.",
          check: {
            question: "What is the maximum applied leakage for a two-vehicle air-brake combination?",
            options: ["4 psi in 1 minute", "1 psi in 1 minute", "10 psi in 30 seconds", "20 psi before moving"],
            answer: 0,
            explanation: "For a two-vehicle combination, the applied leakage maximum is 4 psi in 1 minute."
          }
        },
        {
          id: "air-low-pop",
          title: "Low-air warning and spring brake activation",
          summary: "The low-air warning comes before the spring brakes activate. Know both events and their approximate thresholds.",
          mustKnow: [
            "Fan the brakes to lower pressure for the low-air warning test.",
            "Low-air warning must activate before pressure falls below 55 psi.",
            "Spring brake/parking controls usually pop out between 20 and 45 psi, or manufacturer specification."
          ],
          memory: "Warn before 55; pop around 20 to 45.",
          drill: "Make a pressure ladder: 140, 100, 55, 20-45.",
          check: {
            question: "During the spring brake test, controls usually pop out around what range?",
            options: ["20 to 45 psi", "90 to 100 psi", "120 to 140 psi", "150 to 180 psi"],
            answer: 0,
            explanation: "Parking controls normally pop out in the low-pressure range, often 20 to 45 psi."
          }
        },
        {
          id: "air-build-static",
          title: "Build rate and static leakage",
          summary: "Build-rate and static-leak tests prove the system can recover pressure and hold it without application.",
          mustKnow: [
            "Dual systems should build from about 85 to 100 psi within 45 seconds at normal idle.",
            "Static leakage maximum is 2 psi for single vehicles, 3 psi for two-vehicle combinations, and 5 psi for three-or-more combinations.",
            "A loss beyond the allowed limit means the brake system needs repair before operation."
          ],
          memory: "Static leak: 2, 3, 5. Applied leak: 3, 4, 6.",
          drill: "Alternate static and applied numbers until you can say them without mixing them.",
          check: {
            question: "What is the static leakage maximum for a two-vehicle combination?",
            options: ["3 psi in 1 minute", "4 psi in 1 minute", "6 psi in 1 minute", "15 psi in 1 minute"],
            answer: 0,
            explanation: "Static leakage is lower than applied leakage: 3 psi for a two-vehicle combination."
          }
        }
      ]
    },
    {
      id: "combination-driving",
      title: "Combination Vehicle Driving",
      exam: "combination",
      source: "Handbook Section 6.1",
      minutes: 46,
      objective: "Know the handling problems unique to tractor-trailers and other combinations.",
      memory: "Long, heavy, hinged vehicles need slow, smooth decisions.",
      focus: "Combination questions often target rollover, crack-the-whip, offtracking, backing, braking, and jackknife recovery.",
      caution: "Empty combinations can stop worse than fully loaded ones because traction is poorer.",
      lessons: [
        {
          id: "combo-rollover",
          title: "Rollover and crack-the-whip",
          summary: "Combination vehicles amplify steering mistakes toward the rear trailer.",
          mustKnow: [
            "Fully loaded rigs are much more likely to roll over in a crash than empty rigs.",
            "Keep cargo low and centered.",
            "Steer gently because rearward amplification can tip the rear trailer."
          ],
          memory: "Low load, slow turns, smooth steering.",
          drill: "Explain why the last trailer in a multi-trailer setup is most vulnerable.",
          check: {
            question: "Which action helps prevent rollovers?",
            options: ["Keep cargo low and drive slowly around turns", "Load cargo high for visibility", "Make quick lane changes", "Brake late into curves"],
            answer: 0,
            explanation: "Low cargo and slower turn speed reduce rollover risk."
          }
        },
        {
          id: "combo-jackknife",
          title: "Trailer skids and jackknife",
          summary: "A trailer skid gets worse if you keep braking the wheels that already lost traction.",
          mustKnow: [
            "Recognize trailer skids early in the mirrors.",
            "Release the brakes to restore traction.",
            "Do not use the trailer hand valve to straighten a jackknifing trailer."
          ],
          memory: "Skid in mirrors, release brakes.",
          drill: "Say the two-step recovery: recognize, release.",
          check: {
            question: "What should you do first to stop a trailer skid caused by locked trailer wheels?",
            options: ["Release the brakes", "Apply the trailer hand valve harder", "Accelerate sharply", "Turn off ABS"],
            answer: 0,
            explanation: "Releasing the brakes helps the trailer wheels regain traction."
          }
        },
        {
          id: "combo-turning",
          title: "Offtracking, turns, and backing",
          summary: "The rear wheels follow a shorter path than the front. Longer combinations make this more dramatic.",
          mustKnow: [
            "Offtracking is when rear wheels follow a different path than front wheels.",
            "Keep the rear close enough to prevent vehicles from passing on the right.",
            "When backing a trailer, initially turn the steering wheel opposite the direction you want the trailer to go."
          ],
          memory: "Rear wheels cut inside.",
          drill: "Draw a right turn and mark where offtracking could hit a curb.",
          check: {
            question: "What is offtracking?",
            options: ["Rear wheels follow a different path than front wheels", "A brake air leak", "A HazMat placard error", "A tire pressure warning"],
            answer: 0,
            explanation: "Offtracking is the inside path taken by rear wheels during turns."
          }
        }
      ]
    },
    {
      id: "coupling",
      title: "Coupling, Uncoupling, and Combination Air",
      exam: "combination",
      source: "Handbook Sections 6.2 through 6.5",
      minutes: 56,
      objective: "Learn safe coupling logic and the extra brake checks for combinations.",
      memory: "Secure the trailer before trusting the connection.",
      focus: "Combination questions test glad hands, tractor protection, trailer air supply, fifth wheel lock, and visual inspection.",
      caution: "Wrong coupling or uncoupling can drop a trailer, damage equipment, or cause a runaway.",
      lessons: [
        {
          id: "coupling-air",
          title: "Trailer air controls",
          summary: "Combination brakes depend on air lines, glad hands, trailer tanks, shut-off valves, and tractor protection.",
          mustKnow: [
            "Glad hands connect tractor and trailer air lines.",
            "The tractor protection valve protects tractor air if the trailer breaks away or leaks heavily.",
            "Trailer air supply control charges the trailer system and can apply trailer emergency brakes."
          ],
          memory: "Service line controls; emergency line supplies and protects.",
          drill: "Sketch service and emergency lines in different colors.",
          check: {
            question: "What are glad hands used for?",
            options: ["Connecting tractor and trailer air lines", "Measuring tire tread", "Locking cargo doors", "Adjusting mirrors"],
            answer: 0,
            explanation: "Glad hands are air-line coupling devices."
          }
        },
        {
          id: "coupling-steps",
          title: "Coupling sequence",
          summary: "Coupling is a sequence: inspect, align, secure, connect, test, and visually confirm.",
          mustKnow: [
            "Inspect the fifth wheel, kingpin, apron, and trailer height before backing under.",
            "After coupling, raise landing gear fully and secure the handle.",
            "Perform a pull test and visual check to confirm the locking jaws are closed around the kingpin."
          ],
          memory: "Look, back, lock, tug, look again.",
          drill: "Explain why the pull test is not enough without the visual check.",
          check: {
            question: "After coupling a tractor-semitrailer, what should confirm the kingpin is locked?",
            options: ["A pull test and visual inspection", "Only a dashboard light", "Only the cargo paperwork", "Only the turn signals"],
            answer: 0,
            explanation: "The handbook emphasizes testing and visually checking the coupling."
          }
        },
        {
          id: "coupling-uncouple",
          title: "Uncoupling sequence",
          summary: "Uncoupling requires stable ground, trailer security, landing gear, air/electrical disconnection, and slow separation.",
          mustKnow: [
            "Make sure the trailer is secure before releasing the fifth wheel.",
            "Chock if needed, especially if spring brakes are absent or uncertain.",
            "Disconnect air/electric lines and secure them before pulling clear."
          ],
          memory: "Secure before release.",
          drill: "List the things that keep the trailer from moving after uncoupling.",
          check: {
            question: "Why might you chock a trailer during uncoupling?",
            options: ["To prevent movement if brakes are uncertain", "To increase horsepower", "To drain coolant", "To make the trailer taller"],
            answer: 0,
            explanation: "Chocks protect against trailer movement when brake security is uncertain."
          }
        }
      ]
    },
    {
      id: "skills-inspection",
      title: "Vehicle Inspection Test",
      exam: "general",
      source: "Handbook Section 11",
      minutes: 44,
      objective: "Translate study knowledge into the spoken inspection performance DMV expects.",
      memory: "Name the part, say the condition, explain why it matters.",
      focus: "This section is not just for the road test. California's online handbook tells learners to review Section 11 when preparing for inspection.",
      caution: "Labels or marked components on the vehicle can be prohibited for the inspection test.",
      lessons: [
        {
          id: "skills-all-vehicles",
          title: "All-vehicle items",
          summary: "The inspection test checks whether you can identify unsafe components and explain their condition.",
          mustKnow: [
            "Internal inspection includes engine compartment, cab check, gauges, warning lights, and safety equipment.",
            "External inspection covers steering, suspension, brakes, wheels, lights, reflectors, and leaks.",
            "For Class A, expect coupling and trailer inspection knowledge."
          ],
          memory: "Part, condition, reason.",
          drill: "Practice one inspection sentence: The component is mounted, secure, not cracked, bent, or leaking.",
          check: {
            question: "What is the examiner testing during vehicle inspection?",
            options: ["Whether you know if the vehicle is safe to drive", "Whether you can parallel park only", "Whether you know fuel prices", "Whether you can navigate by memory"],
            answer: 0,
            explanation: "You are tested on inspection knowledge and safety judgment."
          }
        },
        {
          id: "skills-class-a",
          title: "Class A inspection emphasis",
          summary: "Class A adds tractor, coupling, trailer, and combination brake concerns.",
          mustKnow: [
            "Inspect fifth wheel, kingpin, locking jaws, release arm, mounting bolts, and no space between apron and fifth wheel.",
            "Inspect trailer front, sides, rear, lights, doors, landing gear, and cargo securement where applicable.",
            "Inspect air/electrical lines for damage, secure mounting, and proper connection."
          ],
          memory: "Fifth wheel locked, lines connected, trailer secure.",
          drill: "Write a short inspection script for fifth wheel and kingpin.",
          check: {
            question: "Which item is especially Class A specific?",
            options: ["Fifth wheel and kingpin inspection", "Windshield wipers", "Seatbelt condition", "Horn operation"],
            answer: 0,
            explanation: "All items matter, but fifth wheel/kingpin inspection is specific to tractor-trailer combinations."
          }
        }
      ]
    },
    {
      id: "skills-control-road",
      title: "Basic Control and Road Test",
      exam: "general",
      source: "Handbook Sections 12 and 13",
      minutes: 38,
      objective: "Know what the skills test measures so practice matches the exam.",
      memory: "Control area first, traffic system second.",
      focus: "Basic control exercises include backing and parking patterns; road test scoring watches traffic checks, turns, lane use, speed, and signals.",
      caution: "Practice test knowledge helps, but actual skills need hands-on training with a qualified provider.",
      lessons: [
        {
          id: "skills-control",
          title: "Basic control exercises",
          summary: "Basic control is about positioning the vehicle precisely without hitting boundaries or losing safe observation habits.",
          mustKnow: [
            "Exercises can include straight-line backing, offset backing, parallel parking, and alley dock.",
            "Encroachments, pull-ups, and final position can affect scoring.",
            "Slow speed and small corrections are your friend."
          ],
          memory: "Slow enough to correct.",
          drill: "Draw the shape of straight backing, offset backing, parallel park, and alley dock.",
          check: {
            question: "Which is a basic control skill exercise?",
            options: ["Straight-line backing", "HazMat fingerprinting", "Medical self-certification", "Written sample test"],
            answer: 0,
            explanation: "Straight-line backing is one of the basic control exercises."
          }
        },
        {
          id: "skills-road",
          title: "Road test behavior",
          summary: "The road test evaluates safe decisions in ordinary traffic, not just whether the truck moves.",
          mustKnow: [
            "Expect scoring on turns, intersections, lane changes, expressway/highway driving, starts/stops, curves, and railroad crossings.",
            "Traffic checks, mirror use, signals, lane position, speed control, and steering are watched throughout.",
            "Use 4-way flashers when required by the road-test situation, such as certain stop/start procedures."
          ],
          memory: "Signal, mirror, lane, speed.",
          drill: "Ride along with any driver and silently score mirror checks, signals, lane position, and speed.",
          check: {
            question: "Which behavior is watched throughout the road test?",
            options: ["Regular traffic checks", "Radio volume", "Personal playlist", "Brand of truck"],
            answer: 0,
            explanation: "Traffic checks and mirror use are core road-test behaviors."
          }
        }
      ]
    },
    {
      id: "endorsements",
      title: "Optional Endorsement Briefing",
      exam: "endorsements",
      source: "Handbook Sections 7, 8, 9, 10; FMCSA training overview",
      minutes: 50,
      objective: "Preview the endorsements that can raise opportunity after the base Class A plan.",
      memory: "Tanker moves, HazMat communicates, doubles amplify, buses protect people.",
      focus: "For your roadmap, treat endorsements as the next phase after the base CDL unless a school or DMV plan makes earlier testing useful.",
      caution: "HazMat has extra ELDT theory, background check, fingerprinting, and security requirements.",
      lessons: [
        {
          id: "endorse-doubles",
          title: "Doubles and triples",
          summary: "Multi-trailer setups increase crack-the-whip, space, inspection, and coupling complexity.",
          mustKnow: [
            "The rear trailer is most affected by crack-the-whip.",
            "Converter dollies must be inspected and secured.",
            "Look far ahead and manage more space."
          ],
          memory: "More trailers, more amplification.",
          drill: "Explain why doubles/triples need more following distance and smoother steering.",
          check: {
            question: "In doubles/triples, which unit is most vulnerable to crack-the-whip?",
            options: ["The rear trailer", "The tractor hood", "The front bumper", "The fuel tank"],
            answer: 0,
            explanation: "Rearward amplification is strongest toward the rear."
          }
        },
        {
          id: "endorse-tanker",
          title: "Tank vehicles",
          summary: "Tanker safety is dominated by liquid movement, high center of gravity, and outage.",
          mustKnow: [
            "Surge is liquid movement inside the tank.",
            "Baffles reduce forward-and-back surge but not all side-to-side movement.",
            "Outage leaves room for liquid expansion."
          ],
          memory: "Surge moves, baffles slow, outage leaves room.",
          drill: "Draw a partially filled tank and mark surge and outage.",
          check: {
            question: "What is outage?",
            options: ["Space left for liquid expansion", "A trailer skid", "A brake leak", "A placard color"],
            answer: 0,
            explanation: "Outage is empty space left because liquids expand."
          }
        },
        {
          id: "endorse-hazmat",
          title: "Hazardous materials",
          summary: "HazMat rules communicate risk through shipping papers, labels, markings, placards, and emergency information.",
          mustKnow: [
            "Placarded HazMat generally requires an H endorsement.",
            "A placarded vehicle uses placards on all four sides where required.",
            "Shipping papers must be accessible and clearly distinguished from other papers."
          ],
          memory: "Identify, communicate, isolate, respond.",
          drill: "Name the three things you need to choose proper placards.",
          check: {
            question: "Why are placards used?",
            options: ["To communicate the hazard", "To show the truck brand", "To replace shipping papers", "To measure tire tread"],
            answer: 0,
            explanation: "Placards communicate hazard information to responders and others."
          }
        }
      ]
    }
  ],
  flashcards: [
    { id: "fc-001", topic: "General", front: "What three written tests are the core Class A permit stack?", back: "General Knowledge, Air Brakes, and Combination Vehicles.", source: "Section 1; FMCSA Class A test overview" },
    { id: "fc-002", topic: "General", front: "What are the three CDL skills test parts?", back: "Vehicle inspection, basic control skills, and road test.", source: "Section 1.1.2" },
    { id: "fc-003", topic: "Inspection", front: "What is the inspection memory loop?", back: "Before, during, and after the trip.", source: "Section 2.1" },
    { id: "fc-004", topic: "Inspection", front: "What steering wheel play threshold is a high-yield defect?", back: "More than about 10 degrees, roughly 2 inches on a 20-inch wheel.", source: "Section 2.1" },
    { id: "fc-005", topic: "Seeing", front: "How far ahead should a CDL driver look?", back: "At least 12 to 15 seconds ahead.", source: "Section 2.4" },
    { id: "fc-006", topic: "Speed", front: "What three parts make total stopping distance?", back: "Perception distance, reaction distance, and braking distance.", source: "Section 2.6" },
    { id: "fc-007", topic: "Speed", front: "What is the following-distance rule of thumb?", back: "At least 1 second for each 10 feet of vehicle length, with extra time above 40 mph and in poor conditions.", source: "Sections 2.7 and 6.1" },
    { id: "fc-008", topic: "Weather", front: "What headlight setting is best in fog?", back: "Low beams, not high beams.", source: "Section 2.12" },
    { id: "fc-009", topic: "Cargo", front: "What is GCW?", back: "Gross Combination Weight: powered unit, trailer, and cargo together.", source: "Section 3.2" },
    { id: "fc-010", topic: "Cargo", front: "What does high cargo do to rollover risk?", back: "It raises the center of gravity and increases rollover risk.", source: "Sections 3.2 and 6.1" },
    { id: "fc-011", topic: "Air Brakes", front: "What does the air compressor governor control?", back: "Compressor cut-in and cut-out.", source: "Section 5.1" },
    { id: "fc-012", topic: "Air Brakes", front: "When must low-air warning activate?", back: "Before pressure drops below 55 psi, unless manufacturer specs are higher.", source: "Section 5.3" },
    { id: "fc-013", topic: "Air Brakes", front: "Applied leakage limits?", back: "3 psi single, 4 psi two-vehicle combo, 6 psi three-or-more combo in 1 minute.", source: "Section 5.3" },
    { id: "fc-014", topic: "Air Brakes", front: "Static leakage limits?", back: "2 psi single, 3 psi two-vehicle combo, 5 psi three-or-more combo in 1 minute.", source: "Section 5.3" },
    { id: "fc-015", topic: "Air Brakes", front: "When do spring brake controls usually pop out?", back: "Usually between 20 and 45 psi or manufacturer specification.", source: "Section 5.3" },
    { id: "fc-016", topic: "Combination", front: "What is offtracking?", back: "Rear wheels follow a different path than front wheels, usually cutting inside on turns.", source: "Section 6.1" },
    { id: "fc-017", topic: "Combination", front: "How do you stop a trailer skid from locked wheels?", back: "Release the brakes to restore traction.", source: "Section 6.1" },
    { id: "fc-018", topic: "Combination", front: "What are glad hands?", back: "Coupling devices for tractor and trailer air lines.", source: "Section 6.2" },
    { id: "fc-019", topic: "Tanker", front: "What is surge?", back: "Liquid movement inside a tank that can push the vehicle.", source: "Section 8.2" },
    { id: "fc-020", topic: "HazMat", front: "What is the purpose of placards?", back: "To communicate the hazard class/risk to others, especially responders.", source: "Section 9.3" }
  ],
  questions: [
    {
      id: "q001",
      topic: "General",
      exam: "general",
      difficulty: 1,
      section: "Section 1",
      question: "For your current Class A target, which written-test stack should you treat as core?",
      choices: ["General Knowledge, Air Brakes, Combination Vehicles", "Passenger, School Bus, Motorcycle", "Tanker only", "HazMat only"],
      answer: 0,
      explanation: "Class A preparation centers on General Knowledge and Combination Vehicles, with Air Brakes needed for air-brake equipped vehicles."
    },
    {
      id: "q002",
      topic: "General",
      exam: "general",
      difficulty: 1,
      section: "Section 1",
      question: "What score does FMCSA identify as the minimum passing standard for CDL knowledge tests?",
      choices: ["80 percent", "50 percent", "60 percent", "100 percent"],
      answer: 0,
      explanation: "CDL knowledge tests require at least 80 percent correct."
    },
    {
      id: "q003",
      topic: "General",
      exam: "general",
      difficulty: 1,
      section: "Section 1.1",
      question: "Which three parts make up the CDL skills test?",
      choices: ["Vehicle inspection, basic control, road test", "Medical exam, permit, road test", "Written test, fingerprinting, parking", "Vision, hearing, brake adjustment"],
      answer: 0,
      explanation: "The skills test is vehicle inspection, basic control skills, and road test."
    },
    {
      id: "q004",
      topic: "General",
      exam: "general",
      difficulty: 2,
      section: "Section 1",
      question: "Why should you avoid testing in an automatic if you want the broadest future job options?",
      choices: ["It can place an automatic transmission restriction on the CDL", "It cancels the CLP", "It removes Class A eligibility", "It prevents medical certification"],
      answer: 0,
      explanation: "Testing in an automatic can create a restriction against operating manual CMVs."
    },
    {
      id: "q005",
      topic: "Inspection",
      exam: "general",
      difficulty: 1,
      section: "Section 2.1",
      question: "When should a vehicle inspection be completed?",
      choices: ["Before operating the vehicle", "Only after the trip", "Only once per month", "Only when a dashboard warning appears"],
      answer: 0,
      explanation: "Pre-trip inspection should happen before operation."
    },
    {
      id: "q006",
      topic: "Inspection",
      exam: "general",
      difficulty: 1,
      section: "Section 2.1",
      question: "Who is responsible for safe operation once you drive the CMV?",
      choices: ["The driver", "Only the mechanic", "Only the dispatcher", "Only the shipper"],
      answer: 0,
      explanation: "The handbook emphasizes that the driver is responsible for safe operation."
    },
    {
      id: "q007",
      topic: "Inspection",
      exam: "general",
      difficulty: 1,
      section: "Section 2.1",
      question: "Which emergency equipment should you check?",
      choices: ["Warning devices and a properly charged fire extinguisher", "A spare phone charger only", "A coffee mug", "A radio playlist"],
      answer: 0,
      explanation: "Emergency warning devices and the proper fire extinguisher are core inspection items."
    },
    {
      id: "q008",
      topic: "Inspection",
      exam: "general",
      difficulty: 2,
      section: "Section 2.1",
      question: "Which steering condition is a serious defect?",
      choices: ["Steering wheel play over about 10 degrees", "Clean steering wheel", "Adjusted mirrors", "Working horn"],
      answer: 0,
      explanation: "Excessive steering wheel play can indicate unsafe steering."
    },
    {
      id: "q009",
      topic: "Inspection",
      exam: "general",
      difficulty: 2,
      section: "Section 2.1",
      question: "Why is a broken exhaust system dangerous?",
      choices: ["Toxic fumes can enter the cab or sleeper", "It makes cargo lighter", "It increases tire tread", "It prevents offtracking"],
      answer: 0,
      explanation: "Exhaust leaks can allow toxic gases into occupied areas."
    },
    {
      id: "q010",
      topic: "Inspection",
      exam: "general",
      difficulty: 2,
      section: "Section 2.1",
      question: "If hydraulic brakes are being checked, what indicates a possible leak or problem?",
      choices: ["The pedal moves while firm pressure is held", "The windshield is clean", "The horn sounds", "The seatbelt latches"],
      answer: 0,
      explanation: "After pumping and holding firm pressure, pedal movement can indicate a hydraulic brake problem."
    },
    {
      id: "q011",
      topic: "Control",
      exam: "general",
      difficulty: 1,
      section: "Section 2.2",
      question: "When traction is poor, how should you accelerate?",
      choices: ["Very gradually", "As hard as possible", "Only with the parking brake set", "With repeated hard steering inputs"],
      answer: 0,
      explanation: "Gradual acceleration reduces wheel spin."
    },
    {
      id: "q012",
      topic: "Backing",
      exam: "general",
      difficulty: 2,
      section: "Section 2.2",
      question: "What is usually the safest first choice about backing?",
      choices: ["Avoid backing when possible", "Back quickly to finish sooner", "Back without checking mirrors", "Only use one mirror"],
      answer: 0,
      explanation: "Backing is risky and should be avoided when possible."
    },
    {
      id: "q013",
      topic: "Backing",
      exam: "general",
      difficulty: 2,
      section: "Section 2.2",
      question: "When you must back on a curved path, which side is preferred when possible?",
      choices: ["Driver side", "Blind side", "Whichever blocks traffic most", "Neither side matters"],
      answer: 0,
      explanation: "Driver-side backing improves visibility."
    },
    {
      id: "q014",
      topic: "Seeing",
      exam: "general",
      difficulty: 1,
      section: "Section 2.4",
      question: "How far ahead should a CDL driver look?",
      choices: ["12 to 15 seconds", "2 to 3 seconds", "Only to the hood", "Only at the next lane marker"],
      answer: 0,
      explanation: "The handbook teaches a 12 to 15 second visual lead."
    },
    {
      id: "q015",
      topic: "Communicating",
      exam: "general",
      difficulty: 1,
      section: "Section 2.5",
      question: "What should signals do for other drivers?",
      choices: ["Warn them early of your intentions", "Replace mirror checks", "Let you turn without checking space", "Cancel the need to slow down"],
      answer: 0,
      explanation: "Signals communicate intent; they do not replace observation or space management."
    },
    {
      id: "q016",
      topic: "Warning Devices",
      exam: "general",
      difficulty: 2,
      section: "Section 2.5",
      question: "If stopped on a one-way or divided highway, where are warning devices placed?",
      choices: ["10, 100, and 200 feet toward approaching traffic", "5, 15, and 25 feet behind the cab", "100, 200, and 500 feet in front only", "Only on top of the vehicle"],
      answer: 0,
      explanation: "This is a high-yield warning-device placement pattern."
    },
    {
      id: "q017",
      topic: "Speed",
      exam: "general",
      difficulty: 1,
      section: "Section 2.6",
      question: "Total stopping distance includes which three parts?",
      choices: ["Perception, reaction, braking", "Steering, signaling, parking", "Loading, scaling, fueling", "Inspection, coupling, placarding"],
      answer: 0,
      explanation: "Total stopping distance combines perception, reaction, and braking distance."
    },
    {
      id: "q018",
      topic: "Speed",
      exam: "general",
      difficulty: 2,
      section: "Section 2.6",
      question: "When exiting a highway on a downhill curved ramp in a heavy vehicle, when should you slow?",
      choices: ["Before the curve", "Halfway through the curve", "After the curve", "Only if the ramp is icy"],
      answer: 0,
      explanation: "Slow to a safe speed before the curve."
    },
    {
      id: "q019",
      topic: "Space",
      exam: "general",
      difficulty: 2,
      section: "Section 2.7",
      question: "What is the following-distance rule of thumb for vehicle length?",
      choices: ["At least 1 second for each 10 feet of length", "One car length at any speed", "Two seconds for every vehicle", "Only enough room to see the bumper ahead"],
      answer: 0,
      explanation: "Longer vehicles need more following distance."
    },
    {
      id: "q020",
      topic: "Space",
      exam: "general",
      difficulty: 2,
      section: "Section 2.7",
      question: "Why can cargo weight change overhead-clearance risk?",
      choices: ["Vehicle height can change with load weight", "Cargo changes bridge signs", "Cargo makes mirrors wider", "Cargo removes the need to check clearances"],
      answer: 0,
      explanation: "Load weight can affect vehicle height."
    },
    {
      id: "q021",
      topic: "Hazards",
      exam: "general",
      difficulty: 2,
      section: "Section 2.8",
      question: "What is the safest mindset when seeing a hazard?",
      choices: ["Have a plan before the hazard becomes an emergency", "Assume other drivers will solve it", "Close following distance", "Look only at the hazard"],
      answer: 0,
      explanation: "The handbook emphasizes identifying hazards and planning early."
    },
    {
      id: "q022",
      topic: "Distracted Driving",
      exam: "general",
      difficulty: 1,
      section: "Section 2.9",
      question: "What is true about texting while driving a CMV?",
      choices: ["It is dangerous and prohibited", "It is safe below 20 mph", "It is allowed when traffic is light", "It is required for dispatch updates"],
      answer: 0,
      explanation: "Distracted driving is a serious safety and regulatory issue."
    },
    {
      id: "q023",
      topic: "Night Driving",
      exam: "general",
      difficulty: 2,
      section: "Section 2.11",
      question: "At night, your speed should allow you to stop where?",
      choices: ["Within the range of your headlights", "Only within one mile", "Beyond what you can see", "Only at the next exit"],
      answer: 0,
      explanation: "You need to stop within what you can see."
    },
    {
      id: "q024",
      topic: "Fog",
      exam: "general",
      difficulty: 1,
      section: "Section 2.12",
      question: "Which lights are best in fog?",
      choices: ["Low beams and fog lights if equipped", "High beams", "No lights", "Interior dome lights"],
      answer: 0,
      explanation: "Low beams reduce glare in fog."
    },
    {
      id: "q025",
      topic: "Fog",
      exam: "general",
      difficulty: 2,
      section: "Section 2.12",
      question: "When fog becomes too thick for safe driving, what is the best action?",
      choices: ["Park in a safe place until it improves", "Follow taillights closely", "Use high beams and continue", "Stop in the travel lane"],
      answer: 0,
      explanation: "If conditions are too dangerous, get safely off the road."
    },
    {
      id: "q026",
      topic: "Winter Driving",
      exam: "general",
      difficulty: 2,
      section: "Section 2.13",
      question: "On slippery roads, what should you do with speed and control inputs?",
      choices: ["Reduce speed and make smooth movements", "Brake and steer suddenly", "Use cruise control aggressively", "Follow closer to use another vehicle's tracks"],
      answer: 0,
      explanation: "Slippery conditions require lower speed and smooth inputs."
    },
    {
      id: "q027",
      topic: "Hot Weather",
      exam: "general",
      difficulty: 2,
      section: "Section 2.14",
      question: "What should you watch closely in very hot weather?",
      choices: ["Tires, engine temperature, and coolant system", "Only the stereo", "Only the odometer", "Only the trailer color"],
      answer: 0,
      explanation: "Heat increases tire and cooling-system risk."
    },
    {
      id: "q028",
      topic: "Railroad Crossings",
      exam: "general",
      difficulty: 2,
      section: "Section 2.15",
      question: "If stuck on railroad tracks, what should you do?",
      choices: ["Get out and away from the tracks, then call emergency help", "Stay in the cab and wait", "Try to unload cargo on the tracks", "Turn off all warning lights and remain still"],
      answer: 0,
      explanation: "Leave the vehicle and move away from the tracks, then notify emergency services."
    },
    {
      id: "q029",
      topic: "Mountain Driving",
      exam: "general",
      difficulty: 2,
      section: "Section 2.16",
      question: "Before a long downgrade, when should you choose the proper gear?",
      choices: ["Before starting down", "After brakes begin to fade", "Only after reaching the bottom", "Only if the engine stalls"],
      answer: 0,
      explanation: "Choose the gear before descending."
    },
    {
      id: "q030",
      topic: "Emergencies",
      exam: "general",
      difficulty: 2,
      section: "Section 2.17",
      question: "If a front tire fails, what should you do first?",
      choices: ["Hold the steering wheel firmly and stay off the brake until controlled", "Brake hard immediately", "Turn sharply toward the shoulder", "Shift to reverse"],
      answer: 0,
      explanation: "Maintain control first; sudden braking can worsen loss of control."
    },
    {
      id: "q031",
      topic: "ABS",
      exam: "general",
      difficulty: 2,
      section: "Section 2.18",
      question: "What is the main benefit of ABS during hard braking?",
      choices: ["It helps maintain steering control", "It eliminates all stopping distance", "It replaces safe following distance", "It lets you ignore road conditions"],
      answer: 0,
      explanation: "ABS helps prevent wheel lock and preserve steering control."
    },
    {
      id: "q032",
      topic: "Skids",
      exam: "general",
      difficulty: 2,
      section: "Section 2.19",
      question: "What is key to skid recovery?",
      choices: ["Regain traction and steer in the intended direction", "Accelerate hard no matter what", "Close your eyes briefly", "Turn off the engine"],
      answer: 0,
      explanation: "Skid recovery is about restoring traction and steering control."
    },
    {
      id: "q033",
      topic: "Accidents",
      exam: "general",
      difficulty: 1,
      section: "Section 2.20",
      question: "After an accident, what is one of the first safety actions?",
      choices: ["Protect the area", "Move injured people without concern", "Leave without reporting", "Hide warning devices"],
      answer: 0,
      explanation: "Protecting the area helps prevent secondary crashes."
    },
    {
      id: "q034",
      topic: "Fires",
      exam: "general",
      difficulty: 2,
      section: "Section 2.21",
      question: "Water can safely be used on which of these fires?",
      choices: ["Neither electrical nor gasoline fires", "Electrical fires", "Gasoline fires", "Both electrical and gasoline fires"],
      answer: 0,
      explanation: "Water can make electrical or gasoline fires more dangerous."
    },
    {
      id: "q035",
      topic: "Alcohol",
      exam: "general",
      difficulty: 1,
      section: "Section 2.22",
      question: "What is the safest rule about alcohol and commercial driving?",
      choices: ["Do not drink and drive", "Drink only with food", "Drive only short distances", "Use coffee to cancel alcohol effects"],
      answer: 0,
      explanation: "Alcohol impairs driving and creates severe CDL consequences."
    },
    {
      id: "q036",
      topic: "Cargo",
      exam: "cargo",
      difficulty: 1,
      section: "Section 3.1",
      question: "When should cargo securement be inspected?",
      choices: ["Before and during the trip", "Only after delivery", "Only by the shipper", "Only once per year"],
      answer: 0,
      explanation: "Cargo and securing devices must be checked before and during operation."
    },
    {
      id: "q037",
      topic: "Cargo",
      exam: "cargo",
      difficulty: 1,
      section: "Section 3.2",
      question: "Gross Combination Weight refers to what?",
      choices: ["Powered unit, trailer, and cargo together", "Cargo only", "Trailer only", "Fuel only"],
      answer: 0,
      explanation: "GCW is the total weight of the combination and load."
    },
    {
      id: "q038",
      topic: "Cargo",
      exam: "cargo",
      difficulty: 2,
      section: "Section 3.2",
      question: "Why should cargo be kept low?",
      choices: ["To reduce rollover risk", "To increase offtracking", "To hide the load", "To reduce mirror use"],
      answer: 0,
      explanation: "Lower cargo lowers the center of gravity."
    },
    {
      id: "q039",
      topic: "Cargo",
      exam: "cargo",
      difficulty: 2,
      section: "Section 3.3",
      question: "What is the purpose of blocking and bracing?",
      choices: ["Prevent cargo movement", "Increase engine power", "Replace tie-downs in every case", "Make cargo heavier"],
      answer: 0,
      explanation: "Blocking and bracing help keep cargo from shifting."
    },
    {
      id: "q040",
      topic: "Cargo",
      exam: "cargo",
      difficulty: 2,
      section: "Section 3.3",
      question: "Containerized loads are generally used when freight is carried partly by what?",
      choices: ["Rail or ship", "Bicycle", "Passenger bus", "Motorcycle"],
      answer: 0,
      explanation: "Containerized freight often moves across modes such as rail or ship."
    },
    {
      id: "q041",
      topic: "Air Brakes",
      exam: "air-brakes",
      difficulty: 1,
      section: "Section 5.1",
      question: "What does the air compressor do?",
      choices: ["Pumps air into storage tanks", "Steers the truck", "Measures cargo weight", "Locks the fifth wheel"],
      answer: 0,
      explanation: "The compressor supplies air for the air brake system."
    },
    {
      id: "q042",
      topic: "Air Brakes",
      exam: "air-brakes",
      difficulty: 1,
      section: "Section 5.1",
      question: "What does the air compressor governor control?",
      choices: ["Compressor cut-in and cut-out", "Tire tread depth", "Headlight aim", "Cargo seals"],
      answer: 0,
      explanation: "The governor controls when the compressor pumps air."
    },
    {
      id: "q043",
      topic: "Air Brakes",
      exam: "air-brakes",
      difficulty: 1,
      section: "Section 5.1",
      question: "Why drain air tanks?",
      choices: ["To remove water and oil", "To lower tire pressure", "To unlock cargo doors", "To adjust mirrors"],
      answer: 0,
      explanation: "Water and oil in tanks can damage or freeze the system."
    },
    {
      id: "q044",
      topic: "Air Brakes",
      exam: "air-brakes",
      difficulty: 2,
      section: "Section 5.1",
      question: "At about what pressure is the safety valve usually set to open?",
      choices: ["150 psi", "55 psi", "20 psi", "5 psi"],
      answer: 0,
      explanation: "The safety valve is commonly set around 150 psi."
    },
    {
      id: "q045",
      topic: "Air Brakes",
      exam: "air-brakes",
      difficulty: 2,
      section: "Section 5.3",
      question: "Low-air warning must activate before pressure drops below what value?",
      choices: ["55 psi", "150 psi", "5 psi", "300 psi"],
      answer: 0,
      explanation: "The low-air warning must activate before pressure is below 55 psi or manufacturer threshold."
    },
    {
      id: "q046",
      topic: "Air Brakes",
      exam: "air-brakes",
      difficulty: 2,
      section: "Section 5.1",
      question: "What holds spring brakes released during normal operation?",
      choices: ["Air pressure", "Coolant", "Fuel pressure", "Headlight voltage"],
      answer: 0,
      explanation: "Air pressure holds spring brakes off."
    },
    {
      id: "q047",
      topic: "Air Brakes",
      exam: "air-brakes",
      difficulty: 2,
      section: "Section 5.3",
      question: "What is the applied leakage limit for a single vehicle?",
      choices: ["3 psi in 1 minute", "2 psi in 1 minute", "6 psi in 1 minute", "10 psi in 1 minute"],
      answer: 0,
      explanation: "Applied leakage limit is 3 psi for single vehicles."
    },
    {
      id: "q048",
      topic: "Air Brakes",
      exam: "air-brakes",
      difficulty: 2,
      section: "Section 5.3",
      question: "What is the applied leakage limit for a two-vehicle combination?",
      choices: ["4 psi in 1 minute", "3 psi in 1 minute", "2 psi in 1 minute", "8 psi in 1 minute"],
      answer: 0,
      explanation: "Applied leakage limit is 4 psi for a two-vehicle combination."
    },
    {
      id: "q049",
      topic: "Air Brakes",
      exam: "air-brakes",
      difficulty: 2,
      section: "Section 5.3",
      question: "What is the applied leakage limit for a combination of three or more vehicles?",
      choices: ["6 psi in 1 minute", "4 psi in 1 minute", "3 psi in 1 minute", "2 psi in 1 minute"],
      answer: 0,
      explanation: "Applied leakage limit is 6 psi for three or more vehicles."
    },
    {
      id: "q050",
      topic: "Air Brakes",
      exam: "air-brakes",
      difficulty: 3,
      section: "Section 5.3",
      question: "What is the static leakage limit for a two-vehicle combination?",
      choices: ["3 psi in 1 minute", "4 psi in 1 minute", "6 psi in 1 minute", "10 psi in 1 minute"],
      answer: 0,
      explanation: "Static leakage is 3 psi for a two-vehicle combination."
    },
    {
      id: "q051",
      topic: "Air Brakes",
      exam: "air-brakes",
      difficulty: 2,
      section: "Section 5.3",
      question: "Spring brake controls on many vehicles pop out around which pressure range?",
      choices: ["20 to 45 psi", "80 to 100 psi", "120 to 140 psi", "150 to 180 psi"],
      answer: 0,
      explanation: "Spring brake controls commonly activate around 20 to 45 psi or manufacturer specification."
    },
    {
      id: "q052",
      topic: "Air Brakes",
      exam: "air-brakes",
      difficulty: 2,
      section: "Section 5.3",
      question: "For dual air systems, air pressure should build from about 85 to 100 psi within what time?",
      choices: ["45 seconds", "5 minutes", "10 minutes", "1 second"],
      answer: 0,
      explanation: "The handbook gives 45 seconds for dual systems under the stated conditions."
    },
    {
      id: "q053",
      topic: "Air Brakes",
      exam: "air-brakes",
      difficulty: 2,
      section: "Section 5.4",
      question: "If the low-air warning comes on while driving, what should you do?",
      choices: ["Stop and safely park as soon as possible", "Keep driving to use remaining air", "Fan the brakes repeatedly", "Ignore it if the truck feels normal"],
      answer: 0,
      explanation: "Low air is a serious warning; stop and get the system fixed."
    },
    {
      id: "q054",
      topic: "Combination",
      exam: "combination",
      difficulty: 1,
      section: "Section 6.1",
      question: "What two actions help prevent combination-vehicle rollovers?",
      choices: ["Keep cargo low and drive slowly around turns", "Load high and turn quickly", "Use the trailer hand brake on curves", "Ignore cargo position"],
      answer: 0,
      explanation: "Low cargo and slow turns reduce rollover risk."
    },
    {
      id: "q055",
      topic: "Combination",
      exam: "combination",
      difficulty: 2,
      section: "Section 6.1",
      question: "What is crack-the-whip?",
      choices: ["Rearward amplification of steering movement through trailers", "A coolant leak", "A broken exhaust pipe", "An inspection form"],
      answer: 0,
      explanation: "Crack-the-whip is rearward amplification, making rear trailers more likely to roll."
    },
    {
      id: "q056",
      topic: "Combination",
      exam: "combination",
      difficulty: 1,
      section: "Section 6.1",
      question: "Which trailer is most likely to overturn in a sudden movement with multiple trailers?",
      choices: ["The last trailer", "The tractor hood", "The first axle only", "No trailer is affected"],
      answer: 0,
      explanation: "The rear trailer sees the greatest amplification."
    },
    {
      id: "q057",
      topic: "Combination",
      exam: "combination",
      difficulty: 2,
      section: "Section 6.1",
      question: "Why can empty combination vehicles take longer to stop than loaded ones?",
      choices: ["Stiff suspension and strong brakes can reduce traction", "They have more cargo weight", "They have no brakes", "They cannot use mirrors"],
      answer: 0,
      explanation: "Lightly loaded combinations can have poor traction and lock wheels more easily."
    },
    {
      id: "q058",
      topic: "Combination",
      exam: "combination",
      difficulty: 2,
      section: "Section 6.1",
      question: "How should you recover from a trailer skid caused by locked trailer wheels?",
      choices: ["Release the brakes", "Use the trailer hand valve harder", "Turn sharply", "Accelerate aggressively"],
      answer: 0,
      explanation: "Release the brakes to regain traction."
    },
    {
      id: "q059",
      topic: "Combination",
      exam: "combination",
      difficulty: 1,
      section: "Section 6.1",
      question: "What is offtracking?",
      choices: ["Rear wheels follow a different path than front wheels", "A low-air warning", "A HazMat label", "A speedometer error"],
      answer: 0,
      explanation: "Offtracking is the inside path followed by rear wheels."
    },
    {
      id: "q060",
      topic: "Combination",
      exam: "combination",
      difficulty: 2,
      section: "Section 6.1",
      question: "When backing a trailer, which way do you initially turn the steering wheel?",
      choices: ["Opposite the direction you want the trailer to go", "Always left", "Always right", "The same as a car in every moment"],
      answer: 0,
      explanation: "Initial trailer backing input is opposite the desired trailer direction."
    },
    {
      id: "q061",
      topic: "Combination",
      exam: "combination",
      difficulty: 2,
      section: "Section 6.2",
      question: "What are glad hands?",
      choices: ["Air-line coupling devices", "Landing gear handles", "Tie-down hooks", "Warning triangles"],
      answer: 0,
      explanation: "Glad hands connect tractor and trailer air lines."
    },
    {
      id: "q062",
      topic: "Combination",
      exam: "combination",
      difficulty: 2,
      section: "Section 6.2",
      question: "What does the tractor protection valve protect?",
      choices: ["Tractor air supply", "The windshield", "Cargo paperwork", "Fuel temperature"],
      answer: 0,
      explanation: "It helps protect the tractor air supply if the trailer system fails."
    },
    {
      id: "q063",
      topic: "Combination",
      exam: "combination",
      difficulty: 2,
      section: "Section 6.4",
      question: "After coupling, what should you do before driving away?",
      choices: ["Perform a pull test and visual inspection", "Skip landing gear checks", "Leave air lines disconnected", "Assume the sound confirms everything"],
      answer: 0,
      explanation: "A pull test plus visual check helps confirm a safe coupling."
    },
    {
      id: "q064",
      topic: "Combination",
      exam: "combination",
      difficulty: 2,
      section: "Section 6.4",
      question: "Why should you secure or chock a trailer before uncoupling if needed?",
      choices: ["To prevent trailer movement", "To make it lighter", "To increase engine rpm", "To remove all cargo responsibility"],
      answer: 0,
      explanation: "The trailer must be prevented from moving when disconnected."
    },
    {
      id: "q065",
      topic: "Combination",
      exam: "combination",
      difficulty: 2,
      section: "Section 6.5",
      question: "What extra inspection item is required for a combination vehicle?",
      choices: ["Coupling system", "Driver's wallet", "Radio antenna only", "Dashboard decorations"],
      answer: 0,
      explanation: "Combination vehicles require coupling-system inspection."
    },
    {
      id: "q066",
      topic: "Skills",
      exam: "general",
      difficulty: 1,
      section: "Section 11",
      question: "During the vehicle inspection test, what must you be able to explain?",
      choices: ["What you inspect and why", "Only the route to DMV", "Only the truck brand", "Only the fuel price"],
      answer: 0,
      explanation: "The examiner checks inspection knowledge and safety explanation."
    },
    {
      id: "q067",
      topic: "Skills",
      exam: "general",
      difficulty: 2,
      section: "Section 11",
      question: "Which is a Class A-specific inspection focus?",
      choices: ["Fifth wheel, kingpin, and trailer connection", "Motorcycle chain", "School bus stop arm only", "Passenger ticket machine"],
      answer: 0,
      explanation: "Class A tractor-trailers add coupling and trailer inspection items."
    },
    {
      id: "q068",
      topic: "Skills",
      exam: "general",
      difficulty: 1,
      section: "Section 12",
      question: "Which is a basic control skills exercise?",
      choices: ["Offset backing", "HazMat fingerprinting", "Written sample test", "Fuel tax filing"],
      answer: 0,
      explanation: "Offset backing is part of basic control practice."
    },
    {
      id: "q069",
      topic: "Skills",
      exam: "general",
      difficulty: 1,
      section: "Section 13",
      question: "Which behavior is evaluated throughout the road test?",
      choices: ["Regular traffic checks", "Music choice", "Seat color", "Truck brand preference"],
      answer: 0,
      explanation: "Traffic checks, signals, speed, lane use, and control are watched throughout."
    },
    {
      id: "q070",
      topic: "Doubles/Triples",
      exam: "endorsements",
      difficulty: 2,
      section: "Section 7",
      question: "Why do doubles and triples require extra space and smooth steering?",
      choices: ["They amplify movement toward the rear", "They are always lighter", "They cannot roll over", "They have no brakes"],
      answer: 0,
      explanation: "Multiple trailers amplify steering movement and increase rollover risk."
    },
    {
      id: "q071",
      topic: "Doubles/Triples",
      exam: "endorsements",
      difficulty: 2,
      section: "Section 7",
      question: "What is a converter dolly used for?",
      choices: ["Connecting trailers in doubles/triples", "Draining coolant", "Measuring tire air", "Replacing a placard"],
      answer: 0,
      explanation: "Converter dollies are coupling devices used in multi-trailer setups."
    },
    {
      id: "q072",
      topic: "Tanker",
      exam: "endorsements",
      difficulty: 1,
      section: "Section 8",
      question: "What is liquid surge?",
      choices: ["Movement of liquid inside the tank", "A low-air warning", "A cargo seal", "A tire defect"],
      answer: 0,
      explanation: "Surge is the movement of liquid inside a tank."
    },
    {
      id: "q073",
      topic: "Tanker",
      exam: "endorsements",
      difficulty: 2,
      section: "Section 8",
      question: "What do baffles mainly help control?",
      choices: ["Forward-and-back liquid surge", "Placard colors", "Engine temperature", "Mirror vibration only"],
      answer: 0,
      explanation: "Baffles reduce forward-and-back surge but do not eliminate all side-to-side surge."
    },
    {
      id: "q074",
      topic: "Tanker",
      exam: "endorsements",
      difficulty: 2,
      section: "Section 8",
      question: "Why is outage needed in a tank vehicle?",
      choices: ["Liquids expand and need space", "To increase offtracking", "To remove placards", "To reduce mirror checks"],
      answer: 0,
      explanation: "Outage leaves room for liquid expansion."
    },
    {
      id: "q075",
      topic: "HazMat",
      exam: "endorsements",
      difficulty: 1,
      section: "Section 9",
      question: "What does a HazMat placard communicate?",
      choices: ["The hazard class or risk", "The truck's mileage", "The driver's name", "The route number only"],
      answer: 0,
      explanation: "Placards communicate hazard information."
    },
    {
      id: "q076",
      topic: "HazMat",
      exam: "endorsements",
      difficulty: 2,
      section: "Section 9",
      question: "Where should HazMat shipping papers be kept when driving?",
      choices: ["Accessible and clearly distinguished from other papers", "Locked in an unreachable cargo box", "Thrown away after loading", "Hidden behind the trailer tires"],
      answer: 0,
      explanation: "Shipping papers must be accessible and identifiable."
    },
    {
      id: "q077",
      topic: "HazMat",
      exam: "endorsements",
      difficulty: 2,
      section: "Section 9",
      question: "Placarded HazMat generally requires which endorsement?",
      choices: ["H endorsement", "Passenger endorsement only", "Motorcycle endorsement", "No endorsement"],
      answer: 0,
      explanation: "Placarded hazardous materials require HazMat qualification."
    },
    {
      id: "q078",
      topic: "Passenger",
      exam: "endorsements",
      difficulty: 1,
      section: "Section 4",
      question: "Passenger vehicle safety places special emphasis on what?",
      choices: ["Passenger loading, supervision, and emergency exits", "Cargo tie-down chains only", "Fifth wheel release arms", "Liquid outage"],
      answer: 0,
      explanation: "Passenger transport adds loading, supervision, emergency exits, and passenger-specific practices."
    },
    {
      id: "q079",
      topic: "School Bus",
      exam: "endorsements",
      difficulty: 1,
      section: "Section 10",
      question: "School bus loading and unloading focuses heavily on what area around the bus?",
      choices: ["Danger zones", "Fuel island lanes", "Cargo dock height", "Fifth wheel jaws"],
      answer: 0,
      explanation: "School bus operation requires constant attention to danger zones around the bus."
    },
    {
      id: "q080",
      topic: "HazMat",
      exam: "general",
      difficulty: 2,
      section: "Section 2.23",
      question: "If a vehicle requires HazMat placards and you do not have the proper endorsement, what should you do?",
      choices: ["Do not drive it", "Drive only in daylight", "Remove the placards", "Drive below 25 mph"],
      answer: 0,
      explanation: "Never drive a placarded HazMat vehicle without the required qualification."
    }
  ]
};
