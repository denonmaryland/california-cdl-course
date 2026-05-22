(function () {
  const COURSE = window.CDL_COURSE;
  if (!COURSE) return;

  const DEEP_DIVES = {
    "roadmap-cdl": {
      handbook: [
        "The handbook does not treat CDL class as a label you pick first; it works from the vehicle and the job. Weight rating, actual combination weight, passengers, hazardous material, and special vehicle type all matter. Class A is broad because it reaches combinations with a heavy towed unit, then can also cover lower classes when the correct endorsements are present.",
        "California also separates commercial licensing from ordinary driving privilege. A driver can be legal to drive a car and still be completely unqualified for a CMV if the vehicle, cargo, passenger count, or placarding requirement crosses a CDL line."
      ],
      testAngle: [
        "Expect questions that hide the CDL trigger inside a scenario. Read for gross vehicle weight rating, gross combination weight rating, towed-unit rating, passenger count, and placarded material instead of memorizing only one threshold.",
        "For your Class A path, keep General Knowledge, Air Brakes, and Combination Vehicles grouped together. If one of those is weak, the permit path is weak."
      ],
      roadHabit: [
        "When looking at a job, truck, or school vehicle, ask what license class and endorsements the actual equipment requires. A box truck, bus, tanker, tractor-trailer, and placarded load are different licensing conversations.",
        "Keep a note with your target license outcome: Class A, manual if possible, air brakes, tractor-trailer combination, plus any endorsements you want."
      ],
      traps: [
        "Do not assume a vehicle is non-CDL because it is empty. Ratings can matter even when the vehicle is not loaded.",
        "Do not assume Class A automatically gives every endorsement. Passenger, school bus, tanker, doubles/triples, and HazMat each require their own knowledge focus."
      ]
    },
    "roadmap-tests": {
      handbook: [
        "The handbook separates knowledge testing from skills testing because the two prove different things. The written tests check rules, systems, and decision-making. The skills test checks whether you can inspect, control, and drive the commercial vehicle safely.",
        "The skills test is not just a road drive. It includes vehicle inspection, basic control exercises, and a road test. Your inspection language matters because you must show that you know what a safe part looks like and why an unsafe part is dangerous."
      ],
      testAngle: [
        "Written test questions often ask what must happen before operation, what system is being checked, or which response is safest. The safest answer is usually the one that preserves control, visibility, legal compliance, and inspection discipline.",
        "For skills-test prep, the handbook language of mounted, secured, not cracked, not bent, not leaking, proper level, proper pressure, and no illegal welds is worth memorizing."
      ],
      roadHabit: [
        "Study in two modes: knowledge mode for DMV questions and script mode for the vehicle inspection test. A strong CDL student can both answer the question and say the inspection item out loud.",
        "When practicing, touch or point to the component while naming the condition. This builds the habit needed for the actual inspection test."
      ],
      traps: [
        "Do not treat the road test as the only real test. Many people underestimate inspection and basic control.",
        "Do not learn inspection silently. If you cannot explain the component, condition, and risk, you are not fully ready."
      ]
    },
    "roadmap-restrictions": {
      handbook: [
        "The vehicle used for the skills test can limit the license you receive. Air brake, transmission, and combination configuration can become restrictions if the test vehicle does not prove the broader privilege.",
        "Restrictions matter because they can block jobs later. A driver who tests in the wrong vehicle may have to retest to remove a restriction even after passing the CDL skills test."
      ],
      testAngle: [
        "DMV questions may frame restrictions as equipment consequences. Think in terms of what the examiner saw you operate: manual or automatic, air brake or non-air brake, full tractor-trailer or narrower combination.",
        "The best school questions to ask are practical: what transmission, what brake system, what Class A combination, and whether the vehicle avoids the restrictions you do not want."
      ],
      roadHabit: [
        "Before enrolling or testing, get the vehicle setup in writing. Confirm manual/automatic, air brakes, fifth-wheel tractor-trailer setup, and whether the school trains the inspection language for that equipment.",
        "Keep a restriction checklist next to your study checklist. Passing is good; passing with the right license is better."
      ],
      traps: [
        "Do not assume every Class A test truck gives the same Class A outcome.",
        "Do not wait until test day to learn the vehicle configuration."
      ]
    },
    "inspection-why": {
      handbook: [
        "The handbook makes inspection a continuous responsibility. You inspect before the trip to prevent known defects from becoming crashes, during the trip to catch changes, and after the trip to report defects for repair.",
        "A commercial driver is not just a steering wheel holder. Once you operate the vehicle, unsafe defects become your responsibility. Inspection is part safety system, part legal record, and part professional habit."
      ],
      testAngle: [
        "Questions often ask when to inspect or what to do with unsafe defects. The safe answer is before operation, during operation as needed, after the trip for reporting, and never driving a vehicle with a defect that makes it unsafe.",
        "The test likes defects that affect control: brakes, steering, tires, lights, suspension, coupling, emergency equipment, leaks, and cargo securement."
      ],
      roadHabit: [
        "Build a routine that is the same every time. Start with paperwork and previous inspection reports, then move through engine compartment, cab, lights, exterior, coupling, trailer, brakes, and emergency equipment.",
        "During trips, use stops to re-check tires, hubs, leaks, cargo securement, lights, and anything that smelled, sounded, or felt different while driving."
      ],
      traps: [
        "Do not treat inspection as a memory list only. It is a risk-control process.",
        "Do not ignore small signs like fresh fluid, abnormal tire heat, loose fasteners, or a new air leak sound."
      ]
    },
    "inspection-seven-step": {
      handbook: [
        "The seven-step method gives structure under pressure. The point is not that every company words the steps exactly the same; the point is that you need a repeatable path that prevents skipped systems.",
        "A useful inspection moves from overview to engine compartment, cab controls, lights, walkaround, signal checks, and brake checks. That flow helps you catch both obvious damage and hidden safety failures."
      ],
      testAngle: [
        "DMV questions may ask what belongs in a pre-trip, what should be checked in the cab, or what must be verified during a walkaround. Think system by system: steering, suspension, brakes, tires, wheels, lights, coupling, cargo, and emergency gear.",
        "On the skills test, a strong answer identifies the component, says it is properly mounted and secure, then names defects you do not see."
      ],
      roadHabit: [
        "Practice the same route around the vehicle each time. A consistent physical pattern is easier to remember than a loose mental checklist.",
        "Pair visual checks with touch when safe: tug hoses, check caps, look for leaks, inspect tire condition, and verify secure mounts."
      ],
      traps: [
        "Do not bounce randomly around the vehicle. Random inspection creates missed items.",
        "Do not forget in-cab checks. Gauges, warning devices, horn, heater/defroster, wipers, mirrors, seat belt, and brake tests matter."
      ]
    },
    "inspection-defects": {
      handbook: [
        "High-yield defects are defects that reduce control, stopping, visibility, stability, or legal operation. The handbook repeatedly points drivers back to steering, brakes, tires, wheels, suspension, lights, mirrors, windshield, emergency equipment, and leaks.",
        "Some defects are not just maintenance notes. Steering play, brake air loss, damaged tires, broken suspension parts, inoperative required lights, fuel leaks, or insecure coupling can make the vehicle unsafe to drive."
      ],
      testAngle: [
        "If a question asks whether to continue, ask whether the defect affects steering, braking, tires, wheels, lights, coupling, cargo, or hazardous leak risk. If yes, stop and repair before operating.",
        "Questions may include tempting cosmetic answers. Cosmetic issues are less important than defects that can cause loss of control or make the vehicle illegal."
      ],
      roadHabit: [
        "Use a stop/go mindset. Some issues can be written up after the trip; unsafe issues need repair before operation.",
        "When something feels different while driving, slow down and inspect. A vibration, pull, smell, warning light, or pressure drop is information."
      ],
      traps: [
        "Do not normalize a defect because the truck moved yesterday.",
        "Do not drive on a tire, brake, steering, or coupling concern just because the route is short."
      ]
    },
    "control-smooth": {
      handbook: [
        "Commercial vehicles magnify rough inputs. Heavy weight, high center of gravity, air-brake timing, cargo movement, and trailer dynamics all mean that abrupt steering, braking, or acceleration can create problems that a small vehicle would hide.",
        "Smooth control is not slow reaction. It means planning far enough ahead that you can steer, shift, accelerate, and brake progressively instead of making emergency inputs."
      ],
      testAngle: [
        "Written questions often reward the action that preserves traction and stability. Smooth braking, gradual acceleration, steady steering, and early speed control are usually safer than sudden corrections.",
        "Rough acceleration can break traction, rough braking can lock wheels or shift cargo, and rough steering can start a rollover or trailer swing."
      ],
      roadHabit: [
        "Drive with extra look-ahead time so your hands and feet do less emergency work.",
        "Use lane position, mirror checks, and early signals to make your movements predictable to other road users."
      ],
      traps: [
        "Do not wait until the last second and then rely on the brakes.",
        "Do not confuse quick steering with good steering. In a CMV, quick can become unstable."
      ]
    },
    "control-backing": {
      handbook: [
        "The handbook treats backing as a high-risk maneuver because visibility is limited and the rear of the vehicle can move into people, fixed objects, or traffic. The safest backing is backing you avoided through planning.",
        "When backing is necessary, the process is slow, deliberate, and observable. Get out and look, use mirrors, back toward the driver side when possible, use a helper correctly, and stop when unsure."
      ],
      testAngle: [
        "The safest answer usually includes avoiding backing when possible, backing slowly, using mirrors, getting out and looking, and using pull-ups to correct position.",
        "Questions may try to make speed sound efficient. Speed is the wrong priority in backing; control and observation are the priority."
      ],
      roadHabit: [
        "Set up the backing maneuver before you begin. Position the vehicle, identify fixed hazards, note overhead clearance, and decide where the trailer should end.",
        "If using a helper, agree on signals before movement and stop immediately if you lose sight of the helper."
      ],
      traps: [
        "Do not back blind if you can reposition.",
        "Do not continue backing when the picture in the mirrors no longer makes sense."
      ]
    },
    "control-seeing": {
      handbook: [
        "Seeing ahead is one of the core CDL habits. The handbook emphasizes looking far enough ahead to identify slowdowns, traffic lights, lane changes, hazards, curves, and grade changes before they force sudden action.",
        "Communication includes signals, brake lights, horn when appropriate, hazard flashers when needed, and lane position. Other drivers need time to understand what a large vehicle is about to do."
      ],
      testAngle: [
        "Remember the 12 to 15 second look-ahead idea. It appears in many CDL study materials because it converts vague awareness into a measurable scanning habit.",
        "Expect questions about signaling before turns or lane changes, using mirrors, checking traffic after signals, and communicating when slowing or stopped."
      ],
      roadHabit: [
        "Scan ahead, mirrors, gauges, and escape spaces in a rhythm. Do not stare at one hazard so long that you miss the next one.",
        "Signal early enough that the signal is useful, then verify space with mirrors before moving."
      ],
      traps: [
        "Do not use a turn signal as permission to move. It is communication, not clearance.",
        "Do not focus only on the vehicle directly in front of you; commercial stopping distance requires a longer view."
      ]
    },
    "speed-stopping": {
      handbook: [
        "Stopping distance is built from perception distance, reaction distance, and braking distance. At commercial vehicle size and weight, those pieces add up quickly, especially at highway speed or in poor traction.",
        "Following distance must account for vehicle length. The handbook rule of thumb is at least one second for each ten feet of vehicle length, with additional time over 40 mph and when conditions are poor."
      ],
      testAngle: [
        "If a question gives vehicle length or speed, slow down and calculate the time gap. A 60-foot vehicle needs at least 6 seconds under normal conditions, plus more above 40 mph or in rain, fog, snow, traffic, or poor visibility.",
        "The test may separate perception, reaction, and braking. Do not collapse them into one idea."
      ],
      roadHabit: [
        "Pick a fixed object and count seconds after the vehicle ahead passes it. If you reach it too soon, ease off and rebuild space.",
        "Add space before you need it. Once traffic compresses, a heavy vehicle cannot create stopping distance instantly."
      ],
      traps: [
        "Do not follow car-driver spacing habits in a commercial vehicle.",
        "Do not think better brakes remove the need for space. Weight, speed, and traction still control stopping distance."
      ]
    },
    "speed-downgrades": {
      handbook: [
        "Grades and curves are speed problems before they are brake problems. The handbook teaches drivers to slow before the curve or downgrade, select the proper gear early, and avoid letting speed build beyond control.",
        "Brake overheating is a major mountain-driving risk. If service brakes are used constantly, they can fade, leaving the driver with less stopping power when it is needed most."
      ],
      testAngle: [
        "The safe answer for steep downgrades is to choose the proper gear and speed before starting down. Downshifting after speed has already built can be too late.",
        "For curves, slow to a safe speed before entering. Braking hard in the curve can reduce traction and increase rollover risk."
      ],
      roadHabit: [
        "Read warning signs early: grade percent, curve speed, runaway ramp signs, and truck speed advisories.",
        "Use controlled braking methods and engine braking according to vehicle and company policy, while keeping service brakes available."
      ],
      traps: [
        "Do not coast downhill.",
        "Do not enter a curve at car speed just because smaller vehicles are doing it."
      ]
    },
    "speed-conditions": {
      handbook: [
        "The handbook ties speed to visibility and traction. At night, in fog, rain, snow, smoke, glare, or heavy traffic, the safe speed is the speed that lets you stop within the distance you can see and control the vehicle on the surface available.",
        "Fog is especially dangerous because high beams reflect back and reduce visibility. Low beams and reduced speed are the safer pattern."
      ],
      testAngle: [
        "Questions often ask what to do in fog, heavy rain, or limited visibility. Reduce speed, increase following distance, use low beams in fog, and avoid sudden steering or braking.",
        "If visibility is too poor to continue safely, the answer may be to get off the road safely rather than push forward."
      ],
      roadHabit: [
        "Adjust speed before traction disappears. Wet roads, bridge decks, shaded areas, and standing water can change grip quickly.",
        "Use four-way flashers when stopped or moving very slowly where traffic needs warning, following law and safe practice."
      ],
      traps: [
        "Do not outrun your headlights.",
        "Do not use high beams in fog."
      ]
    },
    "speed-emergencies": {
      handbook: [
        "Emergency handling is about doing the first safe thing. Tire failure, skid, fire, brake problem, or evasive maneuver all require control before panic. Hold steering control, avoid abrupt inputs, and get the vehicle slowed and stopped safely.",
        "ABS helps prevent wheel lock, but it does not shorten every stop or repeal traction limits. The driver still needs space, steering control, and correct braking."
      ],
      testAngle: [
        "For tire failure, hold the steering wheel firmly, stay off the brake at first if braking would worsen control, let the vehicle slow, then stop safely.",
        "For skids, the key is restoring traction. If wheels are locked from braking, release the brakes."
      ],
      roadHabit: [
        "Mentally rehearse emergencies before they happen. A rehearsed first move is faster than a panicked guess.",
        "Carry and know emergency equipment: fire extinguisher, warning devices, spare fuses if required, and proper reporting steps."
      ],
      traps: [
        "Do not slam the brakes during every emergency.",
        "Do not keep driving with smoke, fire, strong burning odor, or a serious control problem."
      ]
    },
    "cargo-inspect": {
      handbook: [
        "Cargo responsibility belongs to the driver even when someone else loaded the vehicle. You must know that cargo is secure, weight is legal, and required documents or seals are handled correctly.",
        "Cargo checks happen before driving and during the trip. Movement, settling, broken securement, damaged covering, or weight shift can change a safe load into an unsafe one."
      ],
      testAngle: [
        "Expect questions about inspecting cargo, checking securement early in the trip, and rechecking after driving or after breaks.",
        "Know the difference between GVW, GVWR, GCW, and GCWR. Weight terms show up because overloading affects steering, braking, suspension, tires, and legality."
      ],
      roadHabit: [
        "Before departure, ask what the cargo is, how it is secured, where the weight sits, and what changes during the trip.",
        "At stops, look for shifted freight, loose straps, damaged blocking, torn covers, leaking material, and signs of overload."
      ],
      traps: [
        "Do not assume the shipper's loading decision removes your responsibility.",
        "Do not ignore a load because it is sealed. You still need to handle legal and safety duties within what you are allowed to inspect."
      ]
    },
    "cargo-balance": {
      handbook: [
        "Weight distribution changes how the vehicle handles. Too much weight on one axle can damage equipment or violate law. Too little weight on steering axles can reduce steering control. High cargo raises rollover risk.",
        "Liquid, hanging meat, livestock, and partially loaded cargo can move in ways that change stability after the vehicle is already moving."
      ],
      testAngle: [
        "If a question mentions top-heavy cargo, curves, or quick steering, think rollover.",
        "If a question mentions too much weight forward, rearward, or to one side, think steering, braking, axle limits, tire stress, and stability."
      ],
      roadHabit: [
        "Use scale tickets and axle weights as feedback, not paperwork clutter.",
        "Drive more gently when cargo can shift or surge. Smooth speed and steering protect both the load and the vehicle."
      ],
      traps: [
        "Do not rely on total weight alone. Axle distribution matters.",
        "Do not treat a light load as automatically safe; high or shifting light cargo can still create risk."
      ]
    },
    "cargo-secure": {
      handbook: [
        "Cargo securement prevents forward, rearward, side-to-side, and vertical movement. Blocking, bracing, tie-downs, covers, dunnage, header boards, and load-specific equipment all serve that purpose.",
        "Securement is not finished just because the load looked good at the dock. Vibration, braking, turning, and road shock can loosen or shift cargo."
      ],
      testAngle: [
        "Questions may ask what securement does or when it should be checked. The answer should include preventing movement and rechecking during the trip.",
        "If cargo could fall, spill, blow, roll, tip, or shift, the driver must control that risk before operation."
      ],
      roadHabit: [
        "Look at the load from the direction forces will act: hard braking throws forward, acceleration pulls rearward, turns push sideways, bumps lift and settle.",
        "Recheck securement after the load has had time to settle."
      ],
      traps: [
        "Do not confuse covered with secured. A tarp is not a complete securement system.",
        "Do not use damaged straps, chains, binders, or anchor points."
      ]
    },
    "air-compressor": {
      handbook: [
        "Air brakes depend on stored compressed air. The compressor builds air, the governor controls when the compressor cuts in and out, and tanks store the air used for braking.",
        "Because air takes time to build and leaks can reduce pressure, the driver must understand pressure gauges, warning devices, drain valves, and recovery rate."
      ],
      testAngle: [
        "Know compressor cut-in and cut-out as governor concepts. The exact manufacturer values can vary, but the system should build, hold, and warn correctly.",
        "If a question asks why air tanks are drained, think moisture and oil contamination that can damage or freeze the system."
      ],
      roadHabit: [
        "Watch air gauges during startup and brake checks. Pressure behavior tells you whether the system is healthy.",
        "Treat repeated compressor cycling, slow build, or unexplained pressure loss as a real defect."
      ],
      traps: [
        "Do not drive just because the vehicle starts and moves. Air pressure must be correct.",
        "Do not ignore moisture in air tanks."
      ]
    },
    "air-warning": {
      handbook: [
        "The low-air warning exists to get your attention before pressure falls to a level where braking is compromised. Warning lights, buzzers, gauges, and safety valves are part of the system's communication with the driver.",
        "The safety valve protects against excessive pressure, while the low-air warning protects against insufficient pressure. They are opposite ends of the pressure problem."
      ],
      testAngle: [
        "Remember the high-yield numbers: low-air warning must activate before pressure drops below 55 psi, and the safety valve is often around 150 psi.",
        "A warning is a stop-and-fix signal. The test will not reward continuing normally with a low-air warning."
      ],
      roadHabit: [
        "During the inspection, intentionally fan down air pressure to verify the warning activates.",
        "While driving, scan gauges enough to catch abnormal pressure behavior early."
      ],
      traps: [
        "Do not treat a buzzer or warning light as a nuisance.",
        "Do not mix up low-pressure warning with spring-brake activation."
      ]
    },
    "air-spring": {
      handbook: [
        "Spring brakes are powerful mechanical brakes held back by air pressure. If air pressure is lost, springs can apply the brakes. This fail-safe design helps stop a runaway vehicle but can also create skids if it happens suddenly.",
        "Parking brake controls and trailer air supply controls are tied to this system. Drivers must understand when controls pop out and what low pressure means."
      ],
      testAngle: [
        "Know the usual spring-brake activation range of about 20 to 45 psi, or manufacturer specification.",
        "Questions may ask why you should not use the parking brake while moving except in emergency situations. Spring brakes can lock wheels."
      ],
      roadHabit: [
        "Use parking brakes only when stopped and secured, unless an emergency procedure requires otherwise.",
        "If pressure drops while driving, get off the road safely before the system forces the issue."
      ],
      traps: [
        "Do not rely on spring brakes as normal service brakes.",
        "Do not ignore a trailer air supply problem in a combination vehicle."
      ]
    },
    "air-applied-leak": {
      handbook: [
        "The applied leakage test checks whether pressure drops too quickly while the brake pedal is held down. It simulates air use under braking and reveals leaks that may not show during a simple static hold.",
        "Leak limits are different for single vehicles, two-vehicle combinations, and three-or-more vehicle combinations because system volume and complexity change."
      ],
      testAngle: [
        "Applied leakage limits are 3 psi for a single vehicle, 4 psi for a two-vehicle combination, and 6 psi for three or more vehicles in one minute.",
        "Do not confuse applied leakage with static leakage. Applied means service brake pedal held down."
      ],
      roadHabit: [
        "Perform the test slowly and consistently so you are measuring the system, not rushing the ritual.",
        "Listen for leaks while watching the gauge. Sound and pressure together tell the story."
      ],
      traps: [
        "Do not release the pedal during an applied leakage test.",
        "Do not drive if leakage exceeds allowable limits."
      ]
    },
    "air-low-pop": {
      handbook: [
        "Low-air warning and spring-brake activation are related but separate events. The warning should happen first, giving the driver time to respond before the spring brakes apply.",
        "The pressure ladder helps organize the system: normal operating range near governor cut-out, low-air warning before 55 psi, and spring-brake activation usually between 20 and 45 psi."
      ],
      testAngle: [
        "If asked which comes first, low-air warning comes before spring brakes pop out.",
        "If asked what to do when low-air warning activates while driving, the safe response is to stop safely and repair the system."
      ],
      roadHabit: [
        "During inspection, fan the brakes down and call out the warning point and pop-out point.",
        "Know your vehicle's manufacturer specification, but memorize the test ranges."
      ],
      traps: [
        "Do not wait for spring brakes to apply before reacting.",
        "Do not restart a trip after a low-air event without finding the cause."
      ]
    },
    "air-build-static": {
      handbook: [
        "Build-rate testing proves the compressor can restore pressure fast enough. Static leakage testing proves the system can hold air without applying the service brake.",
        "Together, build, static, applied, warning, and pop-out tests create a complete air-brake health picture."
      ],
      testAngle: [
        "For dual air systems, pressure should build from about 85 to 100 psi within 45 seconds at governed engine speed.",
        "Static leakage limits are 2 psi single, 3 psi two-vehicle combination, and 5 psi three-or-more combination in one minute."
      ],
      roadHabit: [
        "Use the same order every time: build pressure, check governor, check static, check applied, check low-air warning, check pop-out, then rebuild.",
        "If the numbers are close to failing, treat that as a warning sign rather than a pass to ignore."
      ],
      traps: [
        "Do not mix static and applied leak numbers.",
        "Do not skip the build-rate check because the gauges eventually reached normal."
      ]
    },
    "combo-rollover": {
      handbook: [
        "Combination vehicles have more rollover risk because trailers amplify movement. A small steering input at the tractor can create a larger movement at the rear trailer, especially with doubles or triples.",
        "Speed, load height, curve radius, road slope, and sudden steering all interact. The safest rollover prevention happens before the curve or lane change begins."
      ],
      testAngle: [
        "If a question mentions crack-the-whip, remember the rear trailer is most affected.",
        "If a question mentions rollover, think slow before curves, smooth steering, cargo low and centered, and avoiding sudden lane changes."
      ],
      roadHabit: [
        "Drive far enough ahead that you can make one smooth lane change instead of a sudden dodge.",
        "Respect posted truck curve speeds and ramp speeds."
      ],
      traps: [
        "Do not steer suddenly to save time or correct a missed exit.",
        "Do not assume the tractor's stability means the trailer is stable."
      ]
    },
    "combo-jackknife": {
      handbook: [
        "A jackknife can happen when trailer wheels lose traction and the trailer swings out of line. Locked wheels slide; rolling wheels steer and track better.",
        "The handbook recovery principle is simple but difficult under stress: restore traction by releasing the brakes when locked-wheel braking caused the skid."
      ],
      testAngle: [
        "For trailer skid caused by locked wheels, release the brakes to let wheels roll again.",
        "ABS helps, but safe speed and following distance are still the prevention tools."
      ],
      roadHabit: [
        "Avoid sudden braking on slippery surfaces. Increase following distance before the road demands it.",
        "Feel for trailer movement in mirrors and through the tractor. Early recognition matters."
      ],
      traps: [
        "Do not keep braking locked wheels.",
        "Do not use the trailer hand valve as a parking brake or as a normal speed-control tool."
      ]
    },
    "combo-turning": {
      handbook: [
        "Offtracking means rear wheels follow a different path than front wheels. In turns, the trailer cuts inside the tractor path, so curbs, signs, poles, pedestrians, and vehicles beside you become hazards.",
        "Backing a combination vehicle reverses steering logic at the trailer and can quickly create a severe angle. Slow speed and pull-ups protect you."
      ],
      testAngle: [
        "For right turns, keep the rear of the vehicle from running over curbs or into other road users, but do not swing so wide that cars can squeeze alongside.",
        "For backing, the test rewards backing slowly, using mirrors, getting out and looking, and correcting with pull-ups."
      ],
      roadHabit: [
        "Set up turns early, check mirrors through the turn, and watch trailer tires.",
        "When backing, make small steering inputs and stop before the angle becomes unrecoverable."
      ],
      traps: [
        "Do not rely on where the tractor went; watch where the trailer wheels are going.",
        "Do not let a vehicle sneak into the right side during a wide right turn."
      ]
    },
    "coupling-air": {
      handbook: [
        "Combination air systems use service and emergency lines, glad hands, trailer air tanks, shut-off valves, and tractor protection controls. Air must reach the trailer and return proper braking response.",
        "Incorrectly connected, crossed, damaged, or leaking lines can leave trailer brakes inoperative or unreliable."
      ],
      testAngle: [
        "Service line controls normal braking signal. Emergency/supply line charges the trailer system and can apply trailer emergency brakes if pressure is lost.",
        "Glad hands must be clean, sealed, locked, and connected to the correct lines."
      ],
      roadHabit: [
        "After coupling, connect lines and electrical, charge the trailer, check for leaks, and verify trailer brake operation before moving into traffic.",
        "On doubles or triples, verify shut-off valves are correctly positioned for the trailer configuration."
      ],
      traps: [
        "Do not assume connected glad hands mean the system is working.",
        "Do not leave shut-off valves wrong for the trailer set."
      ]
    },
    "coupling-steps": {
      handbook: [
        "Coupling is a controlled sequence. Inspect the fifth wheel, apron, kingpin, jaws, release handle, mounting, air/electric lines, trailer height, and surrounding area before backing under.",
        "A proper coupling check includes the pull test and a visual inspection. The pull test alone is not enough because it can miss an unsafe partial connection."
      ],
      testAngle: [
        "Know the sequence: inspect, align, back slowly, secure connection, connect lines, raise landing gear, check lights/brakes, and visually confirm the fifth-wheel jaws around the kingpin.",
        "The trailer should be at the correct height so the tractor slightly lifts it during coupling."
      ],
      roadHabit: [
        "Get out and inspect the connection. Look at the jaws, kingpin, apron, gap, release handle, and locking safety latch.",
        "After coupling, tug gently in low gear with trailer brakes applied, then recheck."
      ],
      traps: [
        "Do not couple to a trailer that is too high or too low without correcting height.",
        "Do not skip visual confirmation because you felt a bump."
      ]
    },
    "coupling-uncouple": {
      handbook: [
        "Uncoupling is a rollaway and drop-risk operation. The trailer must be secure, the ground must support the landing gear, and the tractor must be separated slowly without damaging equipment.",
        "Landing gear, air lines, electrical lines, fifth-wheel release, trailer brakes, and tractor position all matter."
      ],
      testAngle: [
        "Questions usually reward stable ground, trailer brake application, landing gear down, lines disconnected, fifth-wheel release pulled, and slow tractor movement.",
        "If the trailer is loaded, landing gear support and ground condition are especially important."
      ],
      roadHabit: [
        "Park straight and level when possible. Set brakes, lower gear, disconnect lines, release fifth wheel, pull out slowly, and confirm the trailer is stable.",
        "Use care with air lines and electrical cables so they do not get stretched, dragged, or crushed."
      ],
      traps: [
        "Do not drop a trailer on soft ground without support.",
        "Do not pull out before confirming the trailer is secure and the landing gear is down."
      ]
    },
    "skills-all-vehicles": {
      handbook: [
        "The inspection test wants proof that you recognize safe and unsafe vehicle conditions. Your words should connect the part to its risk: steering controls direction, suspension supports weight, tires contact the road, brakes stop the vehicle, and lights communicate.",
        "A repeatable inspection script reduces nerves. Most parts can be described with a pattern: properly mounted and secure, not cracked, bent, broken, missing, leaking, loose, or excessively worn."
      ],
      testAngle: [
        "Practice saying condition language out loud. The examiner cannot grade knowledge you only think silently.",
        "Focus on component, condition, and consequence. That makes your inspection sound professional instead of memorized."
      ],
      roadHabit: [
        "Use a full-vehicle pattern even when you are not being tested. Professional repetition makes the test feel familiar.",
        "When you find a defect, decide whether it is legal to drive, safe to drive, and required to report."
      ],
      traps: [
        "Do not list parts without saying what condition you are checking.",
        "Do not forget emergency equipment and in-cab checks."
      ]
    },
    "skills-class-a": {
      handbook: [
        "Class A inspection adds the tractor-trailer connection. Fifth wheel, kingpin, apron, locking jaws, release arm, platform, mounting bolts, air/electric lines, landing gear, trailer frame, and trailer brakes become central.",
        "Combination inspection is about making sure the tractor and trailer are safely connected, properly supplied with air and electricity, and able to brake together."
      ],
      testAngle: [
        "High-yield Class A language includes no gap between apron and fifth wheel, jaws locked around kingpin, release arm in locked position, safety latch engaged, lines connected and not leaking, and landing gear fully raised.",
        "Trailer inspection still includes lights, reflectors, tires, wheels, suspension, brakes, cargo securement, doors, and frame."
      ],
      roadHabit: [
        "After every hook, pause and inspect the coupling. This habit prevents one of the most expensive and dangerous mistakes in trucking.",
        "Use the tug test and visual check as a pair."
      ],
      traps: [
        "Do not trust sound alone during coupling.",
        "Do not forget trailer air and electrical checks after the mechanical connection."
      ]
    },
    "skills-control": {
      handbook: [
        "Basic control exercises prove you can place a large vehicle accurately at low speed. Straight backing, offset backing, parallel parking, and alley docking measure setup, observation, steering control, and correction.",
        "The goal is not speed. The goal is safe positioning without crossing boundaries, hitting objects, or losing awareness."
      ],
      testAngle: [
        "Use pull-ups and get-out-and-look actions strategically. They are better than continuing a bad angle.",
        "The examiner is watching control, not just final position."
      ],
      roadHabit: [
        "Before moving, build a picture of the path. Identify pivot points, trailer tire path, boundary lines, and stopping points.",
        "Move slowly enough that every mistake stays small."
      ],
      traps: [
        "Do not chase the trailer with large steering swings.",
        "Do not wait too long to correct a developing angle."
      ]
    },
    "skills-road": {
      handbook: [
        "The road test measures whether you can drive safely in real traffic. Lane position, mirror use, turns, traffic signals, speed control, railroad crossings, lane changes, braking, and awareness all matter.",
        "The examiner is looking for professional habits under ordinary pressure. Safe commercial driving is calm, early, visible, and predictable."
      ],
      testAngle: [
        "Expect scoring around observation, signaling, speed, space, lane control, turns, stops, and traffic law compliance.",
        "Railroad crossings, bridges, signs, clearance, and traffic checks may appear depending on route."
      ],
      roadHabit: [
        "Narrate your drive during practice: mirrors, signal, space, speed, lane, hazards. This exposes weak habits quickly.",
        "Use extra space and early decisions so the vehicle never looks rushed."
      ],
      traps: [
        "Do not drive like a car driver in a truck test.",
        "Do not let nerves make you skip mirrors or signals."
      ]
    },
    "endorse-doubles": {
      handbook: [
        "Doubles and triples increase combination complexity. More articulation points mean more inspection, more air-line management, more shut-off valve awareness, and more rearward amplification.",
        "Converter dollies, pintle hooks, safety chains, air/electric connections, and trailer order all become part of the driver's safety system."
      ],
      testAngle: [
        "Know crack-the-whip, rear trailer rollover risk, coupling/uncoupling order, air line checks, and shut-off valve positions.",
        "The last trailer is usually the most vulnerable to amplification."
      ],
      roadHabit: [
        "Drive doubles/triples with larger space margins and gentler steering than a single trailer.",
        "Verify every connection and valve. One missed valve can create a brake problem."
      ],
      traps: [
        "Do not treat doubles like a longer single trailer.",
        "Do not rush dolly or rear trailer securement."
      ]
    },
    "endorse-tanker": {
      handbook: [
        "Tank vehicles change driving because liquid moves. Surge can push forward, backward, and sideways, affecting stopping, starting, and cornering.",
        "Even non-HazMat tank loads can require tanker knowledge when the vehicle and tank configuration meet the requirement. Tank shape, baffles, outage, and partial loads matter."
      ],
      testAngle: [
        "Surge is the core concept. Smooth acceleration, smooth braking, and slower curves are the repeated safe answers.",
        "High center of gravity and liquid movement both increase rollover risk."
      ],
      roadHabit: [
        "Begin and end braking smoothly. Let the liquid settle instead of fighting it with sharp inputs.",
        "Respect outage and loading rules so liquid has room to expand when applicable."
      ],
      traps: [
        "Do not assume baffles eliminate surge.",
        "Do not take ramps or curves at dry-van habits."
      ]
    },
    "endorse-hazmat": {
      handbook: [
        "HazMat is a communication and risk-control system. Shipping papers, labels, placards, package markings, segregation tables, emergency response information, and attendance rules tell drivers and responders what the danger is.",
        "The endorsement also involves federal security requirements, including background check and fingerprinting. The knowledge test is only one part of the HazMat path."
      ],
      testAngle: [
        "Expect questions about shipping papers, placards, labels, loading compatibility, parking, smoking, emergencies, and reporting.",
        "The safest answer usually protects people first, communicates the hazard clearly, and follows emergency instructions."
      ],
      roadHabit: [
        "Keep shipping papers accessible and in the required location. Responders need them fast.",
        "Before loading, verify material identity, package condition, placards, segregation, and route/company requirements."
      ],
      traps: [
        "Do not guess with HazMat. Use the documents and rules.",
        "Do not smoke or allow ignition sources around prohibited materials."
      ]
    }
  };

  COURSE.modules.forEach((module) => {
    module.lessons.forEach((lesson) => {
      if (DEEP_DIVES[lesson.id]) lesson.deepDive = DEEP_DIVES[lesson.id];
    });
  });
})();
