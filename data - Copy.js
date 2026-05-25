// ============================================================
//  EXERCISE AI — data.js
//  Full exercise library with muscle targets & calorie data
// ============================================================

const EXERCISES = [
  // ── CHEST ──────────────────────────────────────────────────
  {
    id: 1, name: "Bench Press", muscle: "chest",
    secondary: ["shoulders", "arms"],
    difficulty: "intermediate",
    equipment: "Barbell, Bench",
    calsPer30: 220,
    met: 5.0,
    sets: "3–5 sets × 5–8 reps",
    tip: "Keep shoulder blades retracted and feet flat on the floor.",
    description: "The king of chest exercises. Builds overall chest mass, anterior deltoids, and triceps. Lie flat, grip slightly wider than shoulder-width, lower bar to mid-chest, press explosively.",
    muscles_detail: { primary: "Pectoralis Major", secondary: "Anterior Deltoid, Triceps Brachii" },
    emoji: "🏋️"
  },
  {
    id: 2, name: "Push-Up", muscle: "chest",
    secondary: ["shoulders", "arms", "core"],
    difficulty: "beginner",
    equipment: "None",
    calsPer30: 180,
    met: 3.8,
    sets: "3 sets × 10–20 reps",
    tip: "Keep your body in a straight line from head to heels.",
    description: "The ultimate bodyweight chest exercise. Works the entire chest, shoulders and triceps while also engaging your core for stability.",
    muscles_detail: { primary: "Pectoralis Major", secondary: "Triceps, Anterior Deltoid, Core" },
    emoji: "💪"
  },
  {
    id: 3, name: "Incline Dumbbell Press", muscle: "chest",
    secondary: ["shoulders"],
    difficulty: "intermediate",
    equipment: "Dumbbells, Incline Bench",
    calsPer30: 210,
    met: 4.5,
    sets: "3–4 sets × 8–12 reps",
    tip: "Set bench to 30–45°. Focus on the upper chest stretch at the bottom.",
    description: "Targets the upper chest (clavicular head of pectoralis major). Creates the full, rounded chest look.",
    muscles_detail: { primary: "Upper Pectoralis Major", secondary: "Anterior Deltoid, Triceps" },
    emoji: "🏋️"
  },
  {
    id: 4, name: "Cable Flye", muscle: "chest",
    secondary: [],
    difficulty: "beginner",
    equipment: "Cable Machine",
    calsPer30: 160,
    met: 3.5,
    sets: "3 sets × 12–15 reps",
    tip: "Slight bend in elbows throughout. Squeeze chest at peak contraction.",
    description: "Isolation exercise that stretches and contracts the chest through a wide arc. Great for building the chest 'line' and inner definition.",
    muscles_detail: { primary: "Pectoralis Major (sternal)", secondary: "Anterior Deltoid" },
    emoji: "🔄"
  },

  // ── BACK ───────────────────────────────────────────────────
  {
    id: 5, name: "Deadlift", muscle: "back",
    secondary: ["legs", "glutes", "core"],
    difficulty: "advanced",
    equipment: "Barbell",
    calsPer30: 300,
    met: 6.0,
    sets: "3–5 sets × 3–6 reps",
    tip: "Neutral spine always. Push the floor away, don't pull the bar up.",
    description: "The most complete strength exercise. Builds the entire posterior chain — erectors, traps, lats, glutes, hamstrings. A true full-body movement.",
    muscles_detail: { primary: "Erector Spinae, Trapezius, Latissimus Dorsi", secondary: "Glutes, Hamstrings, Core" },
    emoji: "🏗️"
  },
  {
    id: 6, name: "Pull-Up", muscle: "back",
    secondary: ["arms"],
    difficulty: "intermediate",
    equipment: "Pull-up Bar",
    calsPer30: 250,
    met: 5.5,
    sets: "3–4 sets × 5–12 reps",
    tip: "Full hang at bottom, chin over bar at top. Avoid kipping unless advanced.",
    description: "Best bodyweight back exercise. Targets the lats heavily, building that V-taper shape. Also works biceps and rear delts.",
    muscles_detail: { primary: "Latissimus Dorsi", secondary: "Biceps Brachii, Rear Deltoid, Teres Major" },
    emoji: "⬆️"
  },
  {
    id: 7, name: "Barbell Row", muscle: "back",
    secondary: ["arms", "core"],
    difficulty: "intermediate",
    equipment: "Barbell",
    calsPer30: 240,
    met: 5.0,
    sets: "3–4 sets × 6–10 reps",
    tip: "Hinge at hip, back parallel to floor. Pull to your lower chest.",
    description: "Builds thickness across the entire back. Works lats, rhomboids, traps and rear delts all at once.",
    muscles_detail: { primary: "Latissimus Dorsi, Rhomboids, Trapezius", secondary: "Biceps, Rear Deltoid" },
    emoji: "🔩"
  },
  {
    id: 8, name: "Lat Pulldown", muscle: "back",
    secondary: ["arms"],
    difficulty: "beginner",
    equipment: "Cable Machine",
    calsPer30: 200,
    met: 4.0,
    sets: "3 sets × 10–15 reps",
    tip: "Lean slightly back, pull to upper chest, feel the lat stretch.",
    description: "Great pull-up alternative. Directly targets the lats and builds the V-taper width.",
    muscles_detail: { primary: "Latissimus Dorsi", secondary: "Biceps, Rear Deltoid" },
    emoji: "⬇️"
  },

  // ── SHOULDERS ──────────────────────────────────────────────
  {
    id: 9, name: "Overhead Press", muscle: "shoulders",
    secondary: ["arms", "core"],
    difficulty: "intermediate",
    equipment: "Barbell or Dumbbells",
    calsPer30: 220,
    met: 5.0,
    sets: "3–4 sets × 6–10 reps",
    tip: "Brace core, press straight up, lock out fully overhead.",
    description: "The foundational shoulder movement. Builds all three deltoid heads, especially the front and middle. Also hits triceps hard.",
    muscles_detail: { primary: "Anterior & Lateral Deltoid", secondary: "Triceps, Upper Trapezius, Core" },
    emoji: "🔝"
  },
  {
    id: 10, name: "Lateral Raise", muscle: "shoulders",
    secondary: [],
    difficulty: "beginner",
    equipment: "Dumbbells",
    calsPer30: 140,
    met: 3.0,
    sets: "3–4 sets × 12–20 reps",
    tip: "Slight forward lean, lead with elbows. Don't shrug at the top.",
    description: "The best isolation for the medial deltoid. Creates shoulder width and that 'capped' look.",
    muscles_detail: { primary: "Medial Deltoid", secondary: "Supraspinatus, Anterior Deltoid" },
    emoji: "↔️"
  },
  {
    id: 11, name: "Face Pull", muscle: "shoulders",
    secondary: ["back"],
    difficulty: "beginner",
    equipment: "Cable Machine, Rope",
    calsPer30: 140,
    met: 3.0,
    sets: "3 sets × 15–20 reps",
    tip: "Pull toward your face, elbows high, externally rotate at the end.",
    description: "Targets rear delts and external rotators — essential for shoulder health and balanced development.",
    muscles_detail: { primary: "Posterior Deltoid", secondary: "Rhomboids, Rotator Cuff" },
    emoji: "🎯"
  },

  // ── ARMS ───────────────────────────────────────────────────
  {
    id: 12, name: "Barbell Curl", muscle: "arms",
    secondary: [],
    difficulty: "beginner",
    equipment: "Barbell",
    calsPer30: 160,
    met: 3.5,
    sets: "3–4 sets × 8–12 reps",
    tip: "Elbows stay at sides. Squeeze the bicep at the top.",
    description: "Classic bicep builder. Works both heads of the biceps brachii and the brachialis underneath.",
    muscles_detail: { primary: "Biceps Brachii", secondary: "Brachialis, Brachioradialis" },
    emoji: "💪"
  },
  {
    id: 13, name: "Tricep Dip", muscle: "arms",
    secondary: ["chest", "shoulders"],
    difficulty: "intermediate",
    equipment: "Parallel Bars or Chair",
    calsPer30: 200,
    met: 4.5,
    sets: "3 sets × 8–15 reps",
    tip: "Lean slightly forward for chest focus. Stay upright for tricep focus.",
    description: "Compound tricep movement. Builds the horseshoe shape of the tricep, especially the long and lateral heads.",
    muscles_detail: { primary: "Triceps Brachii (all 3 heads)", secondary: "Anterior Deltoid, Pectoralis" },
    emoji: "⬇️"
  },
  {
    id: 14, name: "Hammer Curl", muscle: "arms",
    secondary: [],
    difficulty: "beginner",
    equipment: "Dumbbells",
    calsPer30: 155,
    met: 3.3,
    sets: "3 sets × 10–15 reps",
    tip: "Neutral grip (thumbs up). Great for forearm and brachialis size.",
    description: "Neutral-grip curl that builds the brachialis and brachioradialis more than standard curls. Adds thickness to the upper arm.",
    muscles_detail: { primary: "Brachialis, Brachioradialis", secondary: "Biceps Brachii" },
    emoji: "🔨"
  },
  {
    id: 15, name: "Skull Crusher", muscle: "arms",
    secondary: [],
    difficulty: "intermediate",
    equipment: "EZ-Bar or Dumbbells, Bench",
    calsPer30: 165,
    met: 3.5,
    sets: "3 sets × 10–12 reps",
    tip: "Lower bar to forehead slowly. Keep elbows pointed at ceiling.",
    description: "Premier isolation for the triceps long head. Builds the meaty part at the back of the arm.",
    muscles_detail: { primary: "Triceps Brachii (long head)", secondary: "Triceps (lateral, medial)" },
    emoji: "💀"
  },

  // ── CORE ───────────────────────────────────────────────────
  {
    id: 16, name: "Plank", muscle: "core",
    secondary: ["shoulders", "glutes"],
    difficulty: "beginner",
    equipment: "None",
    calsPer30: 120,
    met: 2.8,
    sets: "3 sets × 30–90 sec",
    tip: "Neutral spine, glutes squeezed, don't let hips sag or pike up.",
    description: "The foundation of core training. Builds anti-extension strength and works the entire anterior core.",
    muscles_detail: { primary: "Transverse Abdominis, Rectus Abdominis", secondary: "Obliques, Glutes, Anterior Deltoid" },
    emoji: "⬛"
  },
  {
    id: 17, name: "Hanging Leg Raise", muscle: "core",
    secondary: ["arms"],
    difficulty: "intermediate",
    equipment: "Pull-up Bar",
    calsPer30: 175,
    met: 4.0,
    sets: "3 sets × 10–15 reps",
    tip: "Control the descent. Avoid swinging — use your abs, not momentum.",
    description: "Highly effective lower ab and hip flexor exercise. The hanging position also provides a great forearm and grip workout.",
    muscles_detail: { primary: "Rectus Abdominis (lower), Hip Flexors", secondary: "Obliques, Grip Muscles" },
    emoji: "🦵"
  },
  {
    id: 18, name: "Russian Twist", muscle: "core",
    secondary: [],
    difficulty: "beginner",
    equipment: "None or Plate",
    calsPer30: 150,
    met: 3.5,
    sets: "3 sets × 20 reps (10/side)",
    tip: "Rotate from the torso, not just your arms. Keep feet off the floor.",
    description: "Great rotational core exercise targeting the obliques. Add a weight plate or medicine ball for more challenge.",
    muscles_detail: { primary: "Internal & External Obliques", secondary: "Rectus Abdominis, Hip Flexors" },
    emoji: "🌀"
  },
  {
    id: 19, name: "Ab Wheel Rollout", muscle: "core",
    secondary: ["back", "shoulders"],
    difficulty: "advanced",
    equipment: "Ab Wheel",
    calsPer30: 200,
    met: 4.5,
    sets: "3 sets × 8–15 reps",
    tip: "Start from knees. Keep core braced like you're about to get punched.",
    description: "One of the most challenging core exercises. Demands extreme anti-extension strength through the entire anterior chain.",
    muscles_detail: { primary: "Rectus Abdominis, Transverse Abdominis", secondary: "Latissimus Dorsi, Anterior Deltoid" },
    emoji: "⚙️"
  },

  // ── LEGS ───────────────────────────────────────────────────
  {
    id: 20, name: "Squat", muscle: "legs",
    secondary: ["glutes", "core"],
    difficulty: "intermediate",
    equipment: "Barbell or Bodyweight",
    calsPer30: 280,
    met: 5.5,
    sets: "3–5 sets × 5–10 reps",
    tip: "Knees track toes, chest up, break parallel if flexibility allows.",
    description: "King of all exercises. Builds quadriceps, hamstrings, and glutes. Also strengthens the core and lower back isometrically.",
    muscles_detail: { primary: "Quadriceps, Glutes", secondary: "Hamstrings, Erector Spinae, Core" },
    emoji: "🦵"
  },
  {
    id: 21, name: "Romanian Deadlift", muscle: "legs",
    secondary: ["glutes", "back"],
    difficulty: "intermediate",
    equipment: "Barbell or Dumbbells",
    calsPer30: 260,
    met: 5.0,
    sets: "3–4 sets × 8–12 reps",
    tip: "Push hips back, feel hamstring stretch, keep bar close to legs.",
    description: "Premier hamstring isolation movement. Unlike regular deadlift, the knees stay soft throughout, maximizing hamstring stretch and tension.",
    muscles_detail: { primary: "Hamstrings, Glutes", secondary: "Erector Spinae, Hip Flexors" },
    emoji: "📐"
  },
  {
    id: 22, name: "Leg Press", muscle: "legs",
    secondary: ["glutes"],
    difficulty: "beginner",
    equipment: "Leg Press Machine",
    calsPer30: 250,
    met: 5.0,
    sets: "3–4 sets × 10–15 reps",
    tip: "Don't lock knees out at top. Feet high on plate = more glutes/hamstrings.",
    description: "Machine-based quad and glute developer. Allows heavy loading with less lower-back demand than free-weight squats.",
    muscles_detail: { primary: "Quadriceps", secondary: "Glutes, Hamstrings, Calves" },
    emoji: "🖥️"
  },
  {
    id: 23, name: "Lunge", muscle: "legs",
    secondary: ["glutes", "core"],
    difficulty: "beginner",
    equipment: "Bodyweight or Dumbbells",
    calsPer30: 240,
    met: 4.5,
    sets: "3 sets × 10–12 reps/leg",
    tip: "Keep front knee over ankle. Tall torso throughout.",
    description: "Unilateral leg exercise that corrects imbalances between legs. Works quads, glutes and improves balance.",
    muscles_detail: { primary: "Quadriceps, Glutes", secondary: "Hamstrings, Calves, Core" },
    emoji: "🚶"
  },

  // ── GLUTES ─────────────────────────────────────────────────
  {
    id: 24, name: "Hip Thrust", muscle: "glutes",
    secondary: ["legs"],
    difficulty: "beginner",
    equipment: "Barbell, Bench",
    calsPer30: 250,
    met: 5.0,
    sets: "3–4 sets × 10–15 reps",
    tip: "Drive through heels, squeeze glutes hard at the top for 1 sec.",
    description: "The #1 glute-building exercise. Maximizes glute activation through full hip extension under load.",
    muscles_detail: { primary: "Gluteus Maximus", secondary: "Hamstrings, Quadriceps" },
    emoji: "🍑"
  },
  {
    id: 25, name: "Glute Bridge", muscle: "glutes",
    secondary: ["core", "legs"],
    difficulty: "beginner",
    equipment: "None",
    calsPer30: 160,
    met: 3.5,
    sets: "3 sets × 15–20 reps",
    tip: "Push through heels, tuck pelvis at top. Can add plate for resistance.",
    description: "Bodyweight glute activator. Great warm-up or standalone exercise for building glute-mind connection.",
    muscles_detail: { primary: "Gluteus Maximus, Medius", secondary: "Hamstrings, Core" },
    emoji: "🌉"
  },
  {
    id: 26, name: "Cable Kickback", muscle: "glutes",
    secondary: [],
    difficulty: "beginner",
    equipment: "Cable Machine, Ankle Strap",
    calsPer30: 130,
    met: 3.0,
    sets: "3–4 sets × 15–20 reps/side",
    tip: "Slight forward lean, kick straight back, squeeze at full extension.",
    description: "Isolation for the gluteus maximus. Constant cable tension throughout the movement.",
    muscles_detail: { primary: "Gluteus Maximus", secondary: "Hamstrings, Hip Extensors" },
    emoji: "🦵"
  },

  // ── CARDIO ─────────────────────────────────────────────────
  {
    id: 27, name: "Running", muscle: "cardio",
    secondary: ["legs", "core"],
    difficulty: "beginner",
    equipment: "None",
    calsPer30: 350,
    met: 8.0,
    sets: "20–60 min continuous",
    tip: "Land midfoot, not heel. Maintain 180 steps/min cadence.",
    description: "Best calorie-burning cardio. Builds cardiovascular endurance, works the entire lower body and core dynamically.",
    muscles_detail: { primary: "Cardiovascular System", secondary: "Quadriceps, Hamstrings, Calves, Core" },
    emoji: "🏃"
  },
  {
    id: 28, name: "Jump Rope", muscle: "cardio",
    secondary: ["legs", "shoulders"],
    difficulty: "intermediate",
    equipment: "Jump Rope",
    calsPer30: 400,
    met: 10.0,
    sets: "Intervals: 30s on / 30s off × 10",
    tip: "Stay on the balls of your feet, keep jumps small and tight.",
    description: "One of the highest calorie-burning exercises. Improves coordination, footwork, and cardiovascular capacity.",
    muscles_detail: { primary: "Cardiovascular System, Calves", secondary: "Shoulders, Core, Quadriceps" },
    emoji: "⭕"
  },
  {
    id: 29, name: "Cycling", muscle: "cardio",
    secondary: ["legs"],
    difficulty: "beginner",
    equipment: "Bike or Stationary Bike",
    calsPer30: 300,
    met: 6.8,
    sets: "30–90 min",
    tip: "Seat height so leg is 85% extended at bottom. Don't lock the knee.",
    description: "Low-impact cardio that's easy on the joints while still burning significant calories. Great for quads and cardiovascular health.",
    muscles_detail: { primary: "Cardiovascular System, Quadriceps", secondary: "Glutes, Hamstrings, Calves" },
    emoji: "🚴"
  },
  {
    id: 30, name: "Burpee", muscle: "cardio",
    secondary: ["chest", "arms", "core", "legs"],
    difficulty: "intermediate",
    equipment: "None",
    calsPer30: 380,
    met: 8.5,
    sets: "3–5 sets × 10–20 reps",
    tip: "Move fast but land softly. Modify by stepping instead of jumping.",
    description: "The ultimate full-body conditioning exercise. Combines a squat, push-up, and jump into one movement for maximum calorie burn.",
    muscles_detail: { primary: "Full Body, Cardiovascular System", secondary: "Everything" },
    emoji: "💥"
  }
];

// MET values for calorie calculation
// Calories = MET × weight(kg) × time(hours)
function calculateCalories(exercise, durationMin, weightLbs) {
  const weightKg = weightLbs * 0.453592;
  const timeHours = durationMin / 60;
  return Math.round(exercise.met * weightKg * timeHours);
}
