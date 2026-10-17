// Prevent repeated event dispatches from turning one approved incident into
// unbounded model calls. This is a per-request ceiling, NOT a global billing cap.
export class InferenceDispatchBudget {
  private readonly initial = new Set<string>()
  private readonly repair = new Set<string>()

  claimInitial(participantId: string): boolean {
    if (!participantId || this.initial.has(participantId)) return false
    if (this.initial.size >= 3) return false
    this.initial.add(participantId)
    return true
  }

  claimRepair(participantId: string): boolean {
    if (!participantId || this.repair.has(participantId)) return false
    if (this.repair.size >= 1) return false
    this.repair.add(participantId)
    return true
  }

  get dispatchCount(): number {
    return this.initial.size + this.repair.size
  }
}
