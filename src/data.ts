export interface Question {
  id: number;
  text: string;
  options: { letter: string; text: string }[];
  correctAnswer: string;
}

export const rawQuestions = `1. Community Medicine focuses mainly on the health of:
A. One patient only
B. A defined population
C. Animals only
D. Hospitals only

2. The main aim of Community Medicine is to:
A. Treat only surgical cases
B. Promote and maintain health
C. Sell medicines
D. Study anatomy only

3. Preventive Medicine means:
A. Curing diseases after symptoms appear
B. Preventing diseases rather than curing them
C. Treating cancer only
D. Emergency care only

4. Public Health Medicine is a sub-specialty of:
A. Surgery
B. Community Medicine
C. Dermatology
D. Radiology

5. Who may conduct community health services?
A. Community medicine specialists
B. Ministry of Health
C. Governmental and non-governmental agencies
D. All of the above

6. Which of the following is one of the three core public health functions?
A. Assessment
B. Operation
C. Injection
D. Diagnosis only

7. The three core public health functions include:
A. Assessment, Policy Development, Assurance
B. Surgery, Anesthesia, Medicine
C. Diagnosis, Treatment, Discharge
D. Nutrition, Exercise, Sleep

8. International health deals with health across:
A. Hospitals only
B. Regional or national boundaries
C. One family only
D. One school only

9. Health of people with special needs includes:
A. Only athletes
B. People with disabilities needing health care programs
C. Only children
D. Only old people

10. Geriatric health focuses on:
A. Infants
B. Older adults
C. Adolescents only
D. Pregnant women only

11. Adolescents’ health focuses on developments during:
A. Old age
B. Adolescence
C. Pregnancy
D. Infancy only

12. Biostatistics in public health is used to:
A. Explain and predict health outcomes
B. Draw maps only
C. Build hospitals only
D. Study bones only

13. Demography is the scientific study of:
A. Human population
B. Drugs
C. Blood cells
D. Muscles

14. Communicable disease epidemiology studies:
A. Non-infectious diseases only
B. Communicable diseases using epidemiology
C. Nutrition only
D. Mental health only

15. Non-communicable disease epidemiology studies:
A. Infectious disease only
B. Non-communicable disease using epidemiology
C. Vaccines only
D. Surgery only

16. Health education and health promotion are interested in:
A. Health awareness of population
B. Anatomy of the heart only
C. Laboratory tests only
D. X-rays only

17. Mental health includes emotional, psychological, and:
A. Chemical well-being
B. Social well-being
C. Financial profit
D. Physical injury only

18. School health services are introduced to:
A. Students
B. Farmers only
C. Doctors only
D. Old adults only

19. Community nutrition is related to:
A. Nutrition of population and health issues
B. Surgery only
C. Bone fractures
D. International trade

20. According to WHO, health is a state of complete physical, mental, and:
A. Economic well-being
B. Social well-being
C. Political well-being
D. Genetic well-being

21. Health is not merely the absence of:
A. Food
B. Disease or infirmity
C. Education
D. Work

22. Disease is generally associated with:
A. Signs and symptoms
B. Happiness only
C. No abnormality
D. Normal structure only

23. Safe water and clean air are examples of:
A. Physical environment
B. Mental health
C. Biostatistics
D. Demography

24. Low education levels are linked with:
A. Better health always
B. Poor health and more stress
C. No effect on health
D. Higher immunity always

25. Greater support from families, friends, and communities is linked to:
A. Worse health
B. Better health
C. Disease only
D. Injury only

26. Environment includes:
A. Living elements only
B. Non-living elements only
C. Living and non-living elements
D. Hospitals only

27. Biotic elements include:
A. Water and rocks
B. Animals and plants
C. Sunlight and air
D. Soil only

28. Abiotic elements include:
A. Animals
B. Plants
C. Water, land, sunlight, rocks, and air
D. Birds

29. An ecosystem is a geographic area where organisms and environment:
A. Work together
B. Never interact
C. Are separated completely
D. Exist only in hospitals

30. Agriculture has a significant impact on the use of:
A. Water and soil
B. Computers only
C. Medicine only
D. Oxygen only

31. Agriculture contributes to climate change by releasing:
A. Greenhouse gases such as methane
B. Vitamins
C. Antibiotics
D. Blood cells

32. Psychosocial refers to the interplay between psychological makeup and:
A. Social environment
B. Bone structure
C. Blood group
D. Kidney size

33. The biopsychosocial model includes:
A. Biological, psychological, social factors
B. Surgical, medical, dental factors
C. Water, soil, air only
D. Agent, host, vaccine only

34. A biological factor in the biopsychosocial model may include:
A. Genetics
B. Culture
C. Coping skills
D. Family

35. Chronic stress may contribute to:
A. Hypertension and heart disease
B. Better immunity always
C. No body effect
D. Improved sleep only

36. Stigma is a major barrier to:
A. Seeking care and adhering to treatment
B. Eating food only
C. Breathing air
D. Drinking water

37. Resilience means the ability to:
A. Withstand and recover from adversity
B. Cause disease
C. Avoid all communities
D. Stop all treatment

38. Natural history of disease means disease progression without:
A. Intervention
B. Symptoms
C. Environment
D. Host

39. The epidemiologic triad consists of:
A. Agent, Host, Environment
B. Doctor, Nurse, Patient
C. Water, Air, Soil
D. Assessment, Policy, Assurance

40. In the epidemiologic triad, the host factors include:
A. Age, sex, genetics, immunity, behavior
B. Water chlorination only
C. Food safety only
D. Weather only`;

export const rawAnswers = `1. B
2. B
3. B
4. B
5. D
6. A
7. A
8. B
9. B
10. B
11. B
12. A
13. A
14. B
15. B
16. A
17. B
18. A
19. A
20. B
21. B
22. A
23. A
24. B
25. B
26. C
27. B
28. C
29. A
30. A
31. A
32. A
33. A
34. A
35. A
36. A
37. A
38. A
39. A
40. A`;

export function getParsedData(): Question[] {
  const answersMap = new Map<number, string>();
  rawAnswers.split('\n').forEach(line => {
    const match = line.match(/^(\d+)\.\s+([A-D])/);
    if (match) {
      answersMap.set(parseInt(match[1], 10), match[2]);
    }
  });

  const blocks = rawQuestions.split(/\n\s*\n/).filter(b => b.trim().length > 0);
  return blocks.map(block => {
    const lines = block.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const qMatch = lines[0].match(/^(\d+)\.\s+(.*)/);
    if (!qMatch) return null;
    
    const id = parseInt(qMatch[1], 10);
    const text = qMatch[2];
    
    const options = lines.slice(1).map(opt => {
      const optMatch = opt.match(/^([A-D])\.\s+(.*)/);
      if (optMatch) {
        return { letter: optMatch[1], text: optMatch[2] };
      }
      return null;
    }).filter(Boolean) as { letter: string; text: string }[];

    return {
      id,
      text,
      options,
      correctAnswer: answersMap.get(id) || 'A'
    };
  }).filter(Boolean) as Question[];
}
