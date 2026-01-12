# Mastering Sprint Planning: From Backlog to Velocity Forecasting

Sprint planning is often treated as a checkbox—a meeting where the Product Owner reads stories and the team nods.

But executed well, sprint planning is your most powerful tool for:
- Aligning team capacity with business priorities
- Improving forecast accuracy
- Building team ownership of commitments

The difference between mediocre and exceptional sprint planning often determines whether you ship consistently or firefight constantly.

## The Real Purpose of Sprint Planning

Sprint planning isn't scheduling work. It's:

1. **Demand-Capacity Alignment:** "How much can we realistically complete this sprint?"
2. **Work Decomposition:** Breaking high-level items into manageable stories
3. **Team Understanding:** Building shared comprehension before work begins
4. **Commitment Creation:** Psychological ownership through collaborative input
5. **Risk Identification:** Surfacing dependencies and technical risks early

## The Secret: Pre-Sprint Refinement

Here's what separates good teams from great ones—**good teams spend more time on backlog refinement than sprint planning**.

If your sprint planning extends beyond 2-3 hours, poor backlog refinement is the culprit.

### What Happens Before Sprint Planning:

**Story Writing:** 
- Clear format: "As a [user], I want [capability], so that [benefit]"
- Specific, testable acceptance criteria
- Stories independently valuable where possible

**Estimation:**
- Use Planning Poker to surface disagreements
- Estimate in story points (relative complexity, not hours)
- Flag stories larger than one sprint

**Dependency Mapping:**
- Identify stories that block other stories
- Flag external dependencies
- Adjust story sequence to respect critical paths

**Acceptance Criteria Clarity:**
- Could QA validate without asking questions?
- Do acceptance criteria cover happy path and edge cases?
- Is ambiguity removed?

Well-refined backlogs should be 2-3 sprints deep. Sprint planning becomes a **selection and commitment** activity, not a design activity.

## Capacity Planning: The Foundation

Team velocity isn't magic—it's determined by capacity.

**Capacity Formula:**
```
Available Capacity = Team Size × Hours per Person 
                   × Productivity Rate 
                   - Interruptions 
                   - Context Switching
```

**Example (5-person team, 2-week sprint):**
- Ideal capacity: 5 people × 10 days × 8 hours = 400 person-hours
- Minus meetings: -40 hours
- Minus support/on-call: -20 hours  
- Minus admin/context switching: -20 hours
- **Real capacity: 320 person-hours**

If your team achieves 1 story point per 2 person-hours, expect **160 story points** velocity.

### Historical Velocity: Your Best Predictor

Last 3 sprints: 24, 26, 25 story points

Expected velocity: ~25 points (average)

This is more reliable than optimism or gut feeling.

## Sprint Planning Meeting: The Blueprint

**Pre-Planning (Before the Meeting):**
- Product Owner drafts sprint goal
- Team and PO review top-priority stories
- Architects flag technical considerations

**Part 1: Context & Goal (15-30 minutes)**
Product Owner presents:
- Sprint goal (1-2 sentence strategic objective)
- Top priorities and why they matter
- Business context and customer feedback

**Part 2: Story Discussion & Estimation (1.5-2 hours)**
For each story:
1. Product Owner clarifies requirements
2. Team asks technical questions
3. Team estimates using Planning Poker
4. Team identifies dependencies
5. Scrum Master tracks running total

Stop when total reaches historical velocity.

**Example Discussion:**
- PO: "Dark mode feature. Users want to reduce eye strain at night."
- Dev: "Do we need Windows high contrast mode?"
- PO: "Not initially. Focus on light/dark toggle."
- Tech Lead: "This pairs with the CSS refactor?"
- PO: "Yes, let's bundle them."
- Team: "CSS refactor = 13 points, dark mode = 8 points"

**Part 3: Refinement & Commitment (15 minutes)**
- Confirm sprint goal alignment
- Verify no unmanaged risks
- Team commits: "We commit to these X stories totaling Y points"

## Advanced: Velocity Forecasting

### Simple 3-Sprint Average
```
Sprint 1: 20 points
Sprint 2: 22 points  
Sprint 3: 24 points
Forecast: (20+22+24)/3 = 22 points
```

### Weighted Velocity (Recent = More Important)
```
Last sprint (40% weight): 24 points
2 sprints ago (35%): 22 points
3 sprints ago (25%): 20 points
Forecast: 24×0.4 + 22×0.35 + 20×0.25 = 22.3 points
```

### Capacity-Based Forecasting (New Teams)
```
5 developers × 74 productive hours/sprint = 370 person-hours
Historical: 1.2 story points per person-hour
Expected velocity: 370 × 1.2 = 444... 

Better approach: Track velocity for 3-4 sprints, then use average.
```

## Common Sprint Planning Mistakes

**Mistake 1: Over-Committing Based on Optimism**
"We're crushing it! Let's commit to 30 points this sprint!"

Reality: Velocity increases gradually, if at all. Commit to historical velocity with a small buffer.

**Mistake 2: Planning Individual Tasks Instead of Stories**
Committing to "30 one-hour tasks" instead of "5 six-hour stories" creates false progress sense.

Stories = business value. Tasks = internal work breakdown.

**Mistake 3: Insufficient Product Owner Presence**
PO unavailable → developers guess → rework later.

PO must be present, prepared, and able to make decisions.

**Mistake 4: Ignoring Dependencies**
Story A depends on Story B, but both assigned to different people in same sprint.

Result: False parallelism, blocking, rework.

**Mistake 5: No Capacity for Non-Story Work**
Forgot to account for code reviews, mentoring, tech debt, interruptions.

Solution: Reserve 10-20% of sprint capacity for unplanned work.

## Metrics That Matter

**Sprint Accuracy:**
(Completed points / Committed points) × 100
- Goal: 85-95% (too high = undercommit, too low = overcommit)

**Forecast Error:**
| Forecasted velocity - Actual velocity | / Actual velocity × 100
- Goal: <10% after 4-5 sprints

**Planning Duration:**
- Goal: 2-3 hours for 2-week sprint (proportional for different lengths)

**Backlog Refinement Completeness:**
- % of next sprint's stories refined and estimated before planning
- Goal: 80%+

## Continuous Improvement

Every sprint teaches you something about planning and estimation.

**In Retrospectives, Ask:**
- Were estimates accurate? What drove variance?
- Was sprint goal clear? Did it guide decisions?
- Had we refined enough beforehand?
- Did dependencies get managed?
- Was capacity realistic?

**Experiment With:**
- Different estimation techniques
- Adjusted planning duration
- Different tools (cards vs. digital, spreadsheets vs. Jira)
- Inviting different participants

## The Bottom Line

Teams that master sprint planning don't do it through process perfection. They do it through:

1. **Data-Driven Decisions** - Using historical velocity, not optimism
2. **Clear Communication** - Team and PO aligned before work begins
3. **Continuous Refinement** - Treating planning as evolving competency

The next time you sprint plan, remember: you're not scheduling work. You're making a data-driven commitment to deliver value.

Treat it with strategic importance.

---

**How accurate is your team's sprint estimation? What's one sprint planning improvement you'd make?**