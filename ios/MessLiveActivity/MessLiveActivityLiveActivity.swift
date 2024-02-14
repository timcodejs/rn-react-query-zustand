//
//  MessLiveActivityLiveActivity.swift
//  MessLiveActivity
//
//  Created by Tim Lee on 2/10/24.
//

import ActivityKit
import WidgetKit
import SwiftUI

struct MessLiveActivityLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: MessLiveActivityAttributes.self) { context in
            // Lock screen/banner UI goes here
            VStack {
                HStack {
                  Image(systemName: "heart.fill").tint(.red)
                  Text("진행률")
                }
                ProgressView("", value: Double(context.state.value) / context.attributes.totalNum)
            }
            .padding(30)
            .activityBackgroundTint(Color.black)
            .activitySystemActionForegroundColor(Color.white)
            .foregroundColor(.white)

        } dynamicIsland: { context in
            DynamicIsland {
                // Expanded UI goes here.  Compose the expanded UI through
                // various regions, like leading/trailing/center/bottom
                DynamicIslandExpandedRegion(.leading) {
                    Text("Start")
                }
                DynamicIslandExpandedRegion(.trailing) {
                    Text("End")
                }
                DynamicIslandExpandedRegion(.bottom) {
                  HStack {
                    Image(systemName: "heart.fill").tint(.red)
                    Text("진행률 \(context.state.value)")
                  }
                }
                DynamicIslandExpandedRegion(.bottom) {
                  ProgressView("", value: Double(context.state.value) / context.attributes.totalNum)
                }
            } compactLeading: {
                Text("0")
            } compactTrailing: {
                Text("100")
            } minimal: {
                Text("A앱")
            }
            .widgetURL(URL(string: "http://www.apple.com"))
            .keylineTint(Color.red)
        }
    }
}

extension MessLiveActivityAttributes {
    fileprivate static var preview: MessLiveActivityAttributes {
        MessLiveActivityAttributes(name: "World")
    }
}

extension MessLiveActivityAttributes.ContentState {
    fileprivate static var smiley: MessLiveActivityAttributes.ContentState {
      MessLiveActivityAttributes.ContentState(value: 0)
     }
     
     fileprivate static var starEyes: MessLiveActivityAttributes.ContentState {
         MessLiveActivityAttributes.ContentState(value: 0)
     }
}

#Preview("Notification", as: .content, using: MessLiveActivityAttributes.preview) {
   MessLiveActivityLiveActivity()
} contentStates: {
    MessLiveActivityAttributes.ContentState.smiley
    MessLiveActivityAttributes.ContentState.starEyes
}
