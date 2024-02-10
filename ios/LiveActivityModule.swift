import SwiftUI
import ActivityKit

@available(iOS 16.2, *)
@objc(LiveActivity)
class LiveActivityModule: NSObject {
  
  private var content: ActivityContent<MessLiveActivityAttributes.ContentState>?

  @objc(startActivity)
  func startActivity() {
    do {
      let liveActAttributes = MessLiveActivityAttributes(name: "test")
      let liveActContentState = MessLiveActivityAttributes.ContentState(emoji: "")
      content = ActivityContent(state: liveActContentState, staleDate: nil, relevanceScore: 1.0)
      if let content{
        try Activity.request(attributes: liveActAttributes , content: content, pushType: nil)
      }
    } catch {
      print("Error")
    }
  }

  @objc(endActivity)
  func endActivity() {
    Task {
      for activity in Activity<MessLiveActivityAttributes>.activities {
        await activity.end(content, dismissalPolicy: .default)
      }
    }
  }
}
